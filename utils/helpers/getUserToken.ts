import {REFRESH_TOKEN, USER_TOKEN} from '../constants/token';

export const getUserToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(USER_TOKEN);
    }
};

export const getRefreshToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(REFRESH_TOKEN);
    }
}