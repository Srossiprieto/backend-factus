import type { AxiosInstance } from "axios";
import axios from "axios";

let accessToken: string;
let refreshToken: string;


const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.FACTUS_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});



// Middleware to add the token to requests
apiClient.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && refreshToken) {
            try {
                await refreshTokenHandler();
                // Reintentar la petición original con el nuevo token
                const originalRequest = error.config;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Si falla el refresh, podríamos intentar generar un nuevo token
                try {
                    await generateToken();
                    const originalRequest = error.config;
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return apiClient(originalRequest);
                } catch (generateError) {
                    return Promise.reject(generateError);
                }
            }
        }
        return Promise.reject(error);
    }
);


export const generateToken = async () => {
    console.log('Generando token...');
    try {
        const requestBody = {
            grant_type: 'password',
            username: process.env.FACTUS_EMAIL,
            password: process.env.FACTUS_PASSWORD,
            client_id: process.env.FACTUS_CLIENT_ID,
            client_secret: process.env.FACTUS_CLIENT_SECRET,
        };


        const response = await axios.post(
            `${process.env.FACTUS_API_URL}/oauth/token`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;
        console.log('Token generado correctamente');
    } catch (error: any) {
        console.error('Error al generar el token:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers
        });
        throw new Error(`No se pudo autenticar con la API de Factus: ${error.response?.data?.message || error.message}`);
    }
};

export const refreshTokenHandler = async () => {
    console.log('Refrescando token...');


   console.log('refreshToken:', refreshToken);
    try {
        const response = await axios.post(`${process.env.FACTUS_API_URL}/oauth/token`, {
            grant_type: 'refresh_token',
            client_id: process.env.FACTUS_CLIENT_ID,
            client_secret: process.env.FACTUS_CLIENT_SECRET,
            refresh_token: refreshToken,
        });

        accessToken = response.data.access_token;
        console.log('Token refrescado correctamente:', accessToken);
    } catch (error: any) {
        console.error('Error al refrescar el token:', error.message);
        throw new Error('No se pudo refrescar el token.');
    }
};

export default apiClient;

