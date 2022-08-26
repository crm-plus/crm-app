import {makeAutoObservable} from 'mobx'
import AuthService from "../service/AuthService";
import Credentials from "../type/Credentials";

export default class Auth {
    isAuth = false;
    username = '';

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setUsername(username: string) {
        this.username = username;
    }

    async login(credential: Credentials) {
        return AuthService
            .authenticate(credential)
            .then((response) => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('refreshToken', response.refreshToken);
                this.setAuth(true);
                this.setUsername(response.userName)
                return response
            })
    }

    async refresh() {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
            this.logout();
        } else
            return AuthService
                .refresh(refreshToken)
                .then((response) => {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    this.setAuth(true);
                    this.setUsername(response.userName)
                    return response
                })
                .catch((ex) => {
                    console.log(ex)
                    // this.logout();
                    // throw ex;
                })
    }

    logout() {
        this.setAuth(false)
        this.setUsername('')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    }
}