import express from 'express';
import cors from 'cors';
import authRoutes from '@/routes/auth.route';
import billRoutes from '@/routes/bill.route';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api', billRoutes);

export default app;

