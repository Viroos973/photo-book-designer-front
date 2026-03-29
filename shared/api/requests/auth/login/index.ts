import { instance } from '@/shared/api/instance';

export type PostLoginParams = {
    email: string,
    password: string
};

export type PostLoginConfig = RequestConfig<PostLoginParams>;

export const postLogin = async ({ config, params }: PostLoginConfig) =>
    instance.post<Token>(`auth/login`, params, config);