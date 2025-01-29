import getBills from '@/controllers/billController';
import { Router } from 'express';


const router = Router();

router.get('/bills', getBills);


export default router;
