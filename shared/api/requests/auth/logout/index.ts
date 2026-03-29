import { instance } from '@/shared/api/instance';

export type PostLogoutParams = {
    refreshToken: string
};

export type PostLogoutConfig = RequestConfig<PostLogoutParams>;

export const postLogout = async ({ config, params }: PostLogoutConfig) =>
    instance.post(`auth/logout`, params, config);