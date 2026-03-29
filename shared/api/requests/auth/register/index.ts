import { instance } from '@/shared/api/instance';

export type PostRegisterParams = {
    email: string,
    name: string,
    password: string
};

export type PostRegisterConfig = RequestConfig<PostRegisterParams>;

export const postRegister = async ({ config, params }: PostRegisterConfig) =>
    instance.post<Token>(`auth/register`, params, config);