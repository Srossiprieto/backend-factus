
import type { Request, Response } from 'express';
import { generateToken } from '../utils/apiClient';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, client_id, client_secret } = req.body;
    const token = await generateToken(email, password, client_id, client_secret);
    res.json(token);
  } catch (error) {
    res.status(500).json({ error: 'Error al autenticar' });
  }
};

