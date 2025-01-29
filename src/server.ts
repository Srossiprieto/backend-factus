
import app from './app';
import { initializeAuth } from './services/auth.service';
import axios from 'axios';
import apiClient, { generateToken } from './utils/apiClient';

const PORT = process.env.PORT || 3000;

let authToken: string | null = null;

const fetchData = async () => {
  try {
    await generateToken(); // Genera el token de acceso
    const response = await apiClient.get('/v1/bills'); // Reemplaza '/v1/bills' con el endpoint que necesites
    console.log('Datos obtenidos:', response.data);
  } catch (error: any) {
    console.error('Error al obtener los datos:', error.message);
  }
};
/*

const testAuthEndpoints = async () => {
  try {
    // Prueba de registro
    const registerResponse = await axios.post('http://localhost:3000/api/auth/register', {
      email: 'testuser3@example.com',
      password: 'testpassword',
      name: 'Test User'
    });
    console.log('Registro exitoso:', registerResponse.data);

    // Prueba de login
    const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'testuser3@example.com',
      password: 'testpassword'
    });
    console.log('Login exitoso:', loginResponse.data.token);

    // Guarda el token de autenticación
    authToken = loginResponse.data.token;
  } catch (error: any) {
    console.error('Error en la prueba de autenticación:', error.message);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
    }
  }
};

*/

const startServer = async () => {
  try {
    console.log('Iniciando autenticación...');
    // await initializeAuth(); // Llama la inicialización de autenticación
    console.log('Autenticación inicializada correctamente.');

    // Inicia el servidor
    app.listen(PORT, async () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);

      // Llama a testAuthEndpoints para probar login y register
     // await testAuthEndpoints();

      // Llama a fetchData después de que el servidor haya iniciado y se haya autenticado
     // await fetchData();
    });
  } catch (error: any) {
    console.error('Error al iniciar el servidor:', error.message);
  }
};

startServer();

