import { generateToken } from "@/utils/apiClient";


export const initializeAuth = async () => {
    console.log('Inicializando autenticación...');
  try {
    await generateToken();
    console.log('Autenticación inicializada correctamente.');
  } catch (error: any) {
    console.error('Error durante la inicialización de la autenticación:', error.message);
    throw error;
  }
};

