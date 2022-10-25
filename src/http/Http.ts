import axios from 'axios';

import ApiEndpoint from '../constant/ApiEndpoint';
import { Auth } from '../store/Auth';

const auth = Auth.getInstance();

const $api = axios.create({
    baseURL: ApiEndpoint
});

$api.interceptors.request.use((config) => {
  config.headers!.Authorization = `${localStorage.getItem('token')}`;
  return config;
});


$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if ((error.response.status == 401
      || error.response.status == 403)
      && error.config
      && !error.config._isRetry) {

        originalRequest._isRetry = true;
        await auth.refresh();
        return $api.request(originalRequest);
    }
    throw error;
});

export default $api;