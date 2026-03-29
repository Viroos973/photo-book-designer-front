import type {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {REFRESH_TOKEN, USER_TOKEN} from "@/utils/constants/token";
import {getRefreshToken} from "@/utils/helpers/getUserToken";
import {instance} from "@/shared/api/instance";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const errorInterceptor = async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refresh = getRefreshToken();
    if (!refresh) {
        localStorage.removeItem(USER_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        if (window.location.pathname !== '/') {
            window.location.href = '/';
        }
        return Promise.reject(error);
    }

    try {
        const response = await instance.post(`auth/refresh`, {
            refreshToken: refresh
        });

        const { accessToken, refreshToken } = response.data;

        if (!accessToken || !refreshToken) {
            throw new Error('Invalid token response');
        }

        localStorage.setItem(USER_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        instance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

        return instance(originalRequest);
    } catch (refreshError) {
        localStorage.removeItem(USER_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        if (window.location.pathname !== '/') {
            window.location.href = '/';
        }
        return Promise.reject(refreshError);
    }
};