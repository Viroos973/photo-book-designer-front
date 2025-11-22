import * as z from 'zod';

export const connectSchema = z.object({
    login_key: z.string().min(1, 'Поле должно быть заполнено'),
});

export type ConnectSchema = z.infer<typeof connectSchema>;