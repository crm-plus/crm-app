import Credentials from '../type/Credentials';
import axios from 'axios';
import $api from '../http';
import API_URL from '../constant/ApiEndpoint';
import User from '../type/User';

class UserService {

    static async register(credentials: Credentials) {
        return axios.post(`${API_URL}/users/register`, credentials);
    }

    static async getUserInfo() {
        return $api.get<User>(`${API_URL}/users/info`);
    }
}

export default UserService;