import { createBillInDB, getBillsFromDB } from '@/services/bills.service';
import { billSchema } from '@/schemas/billSchema';
import type { Request, Response } from 'express';



export const createBill = async (req: Request, res: Response) => {
  try {
    console.log('Datos recibidos:', req.body); // Agregar esta línea para depuración
    const billData = billSchema.parse(req.body);

    const bill = await createBillInDB(billData);
    res.status(201).json(bill);
  } catch (error: any) {
    console.error('Error al crear la factura:', error); // Agregar esta línea para depuración
    res.status(400).json({ message: error.message });
  }
};

export const getBills = async (req: Request, res: Response) => {
  try {
    const bills = await getBillsFromDB();
    res.status(200).json(bills);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
