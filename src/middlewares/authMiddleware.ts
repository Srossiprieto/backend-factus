import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/apiClient';
import type { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Verificar JWT de tu aplicación
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;

        // 2. Generar/verificar token de Factus
        await generateToken();

        next();
    } catch (error) {
        res.status(401).json({ error: 'No autorizado' });
    }
};
