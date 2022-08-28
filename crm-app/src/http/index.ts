import axios from 'axios';

import ApiEndpoint from '../constant/ApiEndpoint';
import Auth from '../store/auth';

const auth = new Auth()

const $api = axios.create({
    baseURL: ApiEndpoint
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `${localStorage.getItem('token')}`
    return config;
})


$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        auth.refresh().catch((e) => auth.logout())
        return $api.request(originalRequest)
    }
})

export default $api;