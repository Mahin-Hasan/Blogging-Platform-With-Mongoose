import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['admin', 'user']).optional().default('user'),
    isBlocked: z.boolean().optional().default(false),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
