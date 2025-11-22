import * as z from 'zod';

export const createSchema = z.object({
    name: z.string().min(1, 'Поле должно быть заполнено'),
});

export type CreateSchema = z.infer<typeof createSchema>;