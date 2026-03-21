import * as z from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, 'Поле должно быть заполнено'),
    email: z.string().min(1, 'Введите email').email('Введите корректный email'),
    password: z.string().min(8, 'Пароль должен содержать минимум 8 символов')
        .max(20, 'Пароль должен содержать максимум 20 символов')
        .refine((password) => /[a-zA-Z]/.test(password), {
            message: 'Пароль должен содержать хотя бы одну букву'
        })
        .refine((password) => /\d/.test(password), {
            message: 'Пароль должен содержать хотя бы одну цифру'
        })
});

export type RegisterSchema = z.infer<typeof registerSchema>;