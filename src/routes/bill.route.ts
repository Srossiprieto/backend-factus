import { Router } from 'express';
import { getBills, createBill } from '@/controllers/billController';
import { authMiddleware } from '@/middlewares/authMiddleware';


const router = Router();

router.get('/bills', authMiddleware, getBills);
router.post('/bills',authMiddleware, createBill);

export default router
