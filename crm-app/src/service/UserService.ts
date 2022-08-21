import Credentials from '../type/Credentials';
import axios from 'axios';
import API_URL from "../constant/ApiEndpoint";

class UserService {

    static async register(credentials: Credentials) {
        return axios.post(`${API_URL}/register`, credentials);
    }
}

export default UserService;