import prisma from '@/config/prisma';
import apiClient, { generateToken } from '@/utils/apiClient';
import type { Bill } from '@prisma/client';

export const createBillInDB = async (billData: any): Promise<Bill> => {
  try {
    // Generar el token antes de hacer la solicitud
    await generateToken();

    // Hacer el POST a la API de Factus usando apiClient
    const response = await apiClient.post('/v1/bills/validate', billData);

    // Registrar la respuesta de la API de Factus
    console.log('Respuesta de la API de Factus:', response.data);

    // Extraer el campo relevante de la respuesta
    const { reference_code } = response.data.data.bill;

    // Almacenar el campo relevante en la base de datos
    const newBill = await prisma.bill.create({
      data: {
        reference_code,
      },
    });

    return newBill;
  } catch (error: any) {
    console.error('Error al crear la factura en la API de Factus o en la base de datos:', error.response?.data || error.message);
    throw new Error('Error al crear la factura en la API de Factus o en la base de datos');
  }
};

export const getBillsFromDB = async (): Promise<Bill[]> => {
  try {
    const bills = await prisma.bill.findMany();
    return bills;
  } catch (error) {
    throw new Error('Error al obtener las facturas de la base de datos');
  }
};
