
import app from './app';
import { initializeAuth } from './services/auth.service';
import apiClient, { generateToken } from './utils/apiClient';

const PORT = process.env.PORT || 3000;

const fetchData = async () => {
  try {
    await generateToken(); // Genera el token de acceso

    const response = await apiClient.get('/v1/bills'); // Reemplaza '/v1/bills' con el endpoint que necesites
    console.log('Datos obtenidos:', response.data);
  } catch (error: any) {
    console.error('Error al obtener los datos:', error.message);
  }
};

const startServer = async () => {
  try {
    console.log('Iniciando autenticación...');
    await initializeAuth(); // Llama la inicialización de autenticación
    console.log('Autenticación inicializada correctamente.');

    // Inicia el servidor
    app.listen(PORT, async () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);

      // Llama a fetchData después de que el servidor haya iniciado
      await fetchData();
        console.log('Datos obtenidos correctamente');
    });
  } catch (error: any) {
    console.error('Error al iniciar el servidor:', error.message);
  }
};

startServer();
