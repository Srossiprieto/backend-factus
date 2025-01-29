import prisma from '@/config/prisma';
import bcrypt from 'bcrypt';
import type { User } from '@prisma/client';

export const findUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (email: string, password: string, name: string): Promise<User> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    });
};
