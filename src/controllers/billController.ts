
import apiClient, {generateToken, getAccessToken} from '../utils/apiClient';
import type { Request, Response } from 'express';
     const getBills = async (req: Request, res: Response) => {
        try {
            let token = getAccessToken();

            // Si no hay token, generarlo
            if (!token) {
                await generateToken();
                token = getAccessToken();
            }

            // Si el token aún no está disponible, responder con error
            if (!token) {
                return res.status(401).json({ error: 'No se pudo generar un token de autenticación' });
            }

            const response = await apiClient.get('/v1/bills', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            res.status(200).json(response.data);
        } catch (error: any) {
            console.error('Error al obtener las facturas:', error.message);
            if (error.response) {
                console.error('Detalles del error:', error.response.data);
                return res.status(error.response.status).json(error.response.data);
            }
            res.status(500).json({ error: 'Error al obtener las facturas' });
        }
    }

export default getBills;

