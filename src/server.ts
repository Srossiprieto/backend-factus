
import app from './app';


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
      app.listen(PORT, async () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error: any) {
    console.error('Error al iniciar el servidor:', error.message);
  }
};

startServer();

