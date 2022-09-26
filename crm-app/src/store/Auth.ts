import {makeAutoObservable} from 'mobx'
import AuthService from "../service/AuthService";
import Credentials from "../type/Credentials";

export class Auth {

    private static instance: Auth;
    private isAuth: boolean = false;
    private username: string = '';

    private constructor() {
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
                    localStorage.setItem('username', response.userName);
                    this.setAuth(true);
                    this.setUsername(response.userName)
                    return response
                })
                .catch((ex) => {
                    console.log(ex)
                    this.logout();
                    // throw ex;
                })
    }

    logout() {
        this.setAuth(false)
        this.setUsername('')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    }

    public static getInstance = (): Auth => {
        if(!this.instance) {
            this.instance = new Auth();
        }
        return this.instance
    }

    public getUsername = (): string => {
        return this.username
    }

    public getIsAuth = (): boolean => {
        return this.isAuth
    }
}