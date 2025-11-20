import {USER_TOKEN} from '../constants/token';

export const getUserToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(USER_TOKEN);
    }
};