import axios from 'axios';

import { errorInterceptor } from '@/shared/api/interceptors/errorInterceptor';
import { tokenInterceptor } from '@/shared/api/interceptors/tokenInterceptor';

export const instance = axios.create({
    baseURL: `http://localhost:5192/api/`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(tokenInterceptor);
instance.interceptors.response.use(undefined, errorInterceptor);