import Credentials from "../type/Credentials";
import axios from "axios";
import API_URL from "../constant/ApiEndpoint";
import AuthResponse from "../type/AuthResponse";

class AuthService {

    static async authenticate(credentials: Credentials) : Promise<AuthResponse> {
        return axios.post<AuthResponse>(`${API_URL}/auth/authenticate`, credentials).then((response) => response.data)
    }
}

export default AuthService;