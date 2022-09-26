import {Client} from '@stomp/stompjs'
import API_URL from "../constant/ApiEndpoint";

import {Auth} from "../store/Auth";
import {toast} from "react-toastify";

export class WebSocketClient {

    private static instance: WebSocketClient

    private client: Client

    private auth: Auth

    private authToken: string | null

    private constructor() {
        this.auth = Auth.getInstance()

        const url: string = API_URL
            .replace('http', 'ws')
            .replace('https', 'wss')

        this.authToken = localStorage.getItem('token')
        const username = localStorage.getItem('username')

        this.client = new Client({
            brokerURL: `${url}/stomp`,
            onConnect: () => {
                console.log("Ws connected")

                if(!this.authToken) {
                    this.auth.logout()
                    return
                }

                this.client.subscribe(`/topic/updates/user/${username}/invitation`, (message) => {
                    toast.info("You have received message")
                    // alert(JSON.parse(message.body))
                })
            },
            onDisconnect: () => {
                console.log('WS disconnected')
            },
            onWebSocketError: (e) => {
                console.log(e)
            },
            onStompError: (e) => {
                console.log(e)
                this.authToken = localStorage.getItem('token')
                this.client.connectHeaders['Authorization'] = this.authToken ? this.authToken : '';
                this.client.activate()
            }

        })
        this.client.connectHeaders['Authorization'] = this.authToken ? this.authToken : '';
        this.client.activate()

    }

    public static getInstance = (): WebSocketClient | null => {
        const auth = Auth.getInstance()
        if(auth.getIsAuth()) {
            if (!this.instance) {
                this.instance = new WebSocketClient()
            }
            return this.instance
        }
        return null
    }
}