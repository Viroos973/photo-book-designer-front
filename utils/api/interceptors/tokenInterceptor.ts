import type { InternalAxiosRequestConfig } from 'axios';

import { getUserToken } from '@/utils/helpers/getUserToken';

export const tokenInterceptor = (config: InternalAxiosRequestConfig<any>) => {
    const token = getUserToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};