import * as z from 'zod';

export const createSchema = z.object({
    name: z.string().min(1, 'Поле должно быть заполнено'),
    pagesNum: z.string()
        .min(1, 'Поле должно быть заполнено')
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 5 && Number(val) <= 120, {
            message: "Количество страниц должно быть от 5 до 120"
        }),
    widthTemplate: z.string()
        .min(1, 'Поле должно быть заполнено')
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Размеры страницы должны быть больше 0"
        }),
    heightTemplate: z.string()
        .min(1, 'Поле должно быть заполнено')
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Размеры страницы должны быть больше 0"
        })
});

export type CreateSchema = z.infer<typeof createSchema>;