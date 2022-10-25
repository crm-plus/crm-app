import Credentials from '../type/Credentials';
import axios from 'axios';
import API_URL from '../constant/ApiEndpoint';
import AuthResponse from '../type/AuthResponse';
import { WebSocketClient } from '../websocket/WebSocketClient';

class AuthService {

    static async authenticate(credentials: Credentials): Promise<AuthResponse | any> {
        return axios
            .post<AuthResponse>(`${API_URL}/auth/authenticate`, credentials)
            .then((response) => {
                WebSocketClient.getInstance();
                return response.data;
            });
    }

    static async refresh(refreshToken: string): Promise<AuthResponse | any> {

        const body = {
            refreshToken: refreshToken
        };

        return axios
            .post<AuthResponse>(`${API_URL}/auth/refreshToken`, body)
            .then((response) => {
                return response.data;
            });
    }
}

export default AuthService;