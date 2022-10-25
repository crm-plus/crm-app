import { Client } from '@stomp/stompjs';
import API_URL from '../constant/ApiEndpoint';

import { Auth } from '../store/Auth';
import { toast } from 'react-toastify';
import { NotificationStore } from '../store/NotificationStore';
import { InvitationStore } from '../store/InvitationStore';
import InvitationService from '../service/InvitationService';

export class WebSocketClient {

    private static instance: WebSocketClient;

    private client: Client;

    private auth: Auth;

    private authToken: string | null;

    private invitationService: InvitationService;

    private constructor() {
        this.auth = Auth.getInstance();
        this.invitationService = InvitationService.getInstance();

        const url: string = API_URL
            .replace('http', 'ws')
            .replace('https', 'wss');

        this.authToken = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        this.client = new Client({
            brokerURL: `${url}/stomp`,
            onConnect: () => {
                console.log('WS connected');
                this.client.subscribe(`/topic/updates/user/${username}/invitation`, (message) => {
                    console.log(message);
                    this.invitationService.addInvitation(message);
                });
            },
            onDisconnect: () => {
                console.log('WS disconnected');
            },
            onStompError: (e) => {
                if(e.command == 'ERROR') {
                    this.client.forceDisconnect();
                    return;
                }
                this.authToken = localStorage.getItem('token');
                this.client.connectHeaders['Authorization'] = this.authToken ? this.authToken : '';
                this.client.activate();
            }

        });

        this.client.reconnectDelay = 60;
        this.client.connectHeaders['Authorization'] = this.authToken ? this.authToken : '';
        this.client.activate();
    }

    public static getInstance = (): WebSocketClient | null => {
        const auth = Auth.getInstance();
        if (auth.getIsAuth()) {
            if (!this.instance) {
                this.instance = new WebSocketClient();
            }
            return this.instance;
        }
        return null;
    };
}