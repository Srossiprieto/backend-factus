import apiClient, { generateToken } from './utils/apiClient';

const fetchData = async () => {
  try {
    await generateToken(); // Genera el token de acceso

    const response = await apiClient.get('/v1/bills'); // Reemplaza '/some-endpoint' con el endpoint que necesites
    console.log('Datos obtenidos:', response.data);
  } catch (error: any) {
    console.error('Error al obtener los datos:', error.message);
  }
};

fetchData();
