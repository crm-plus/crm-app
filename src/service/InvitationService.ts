import { InvitationStore } from '../store/InvitationStore';
import { NotificationStore } from '../store/NotificationStore';
import Invitation from '../type/Invitation';
import { toast } from 'react-toastify';
import $api from '../http/Http';


class InvitationService {

    private invitationStore: InvitationStore;
    private notificationStore: NotificationStore;
    private static instance: InvitationService;

    private constructor() {
        this.notificationStore = NotificationStore.getInstance();
        this.invitationStore = InvitationStore.getInstance();
    }

    public static getInstance = (): InvitationService => {
        if (!this.instance) {
            this.instance = new InvitationService();
        }
        return this.instance;
    };

    public addInvitation(message: any) {
        const invitation: Invitation = JSON.parse(message.body);
        toast.info(`You have been received invitation to join ${invitation.organization.name} organization`);
        this.invitationStore.addInvitation(invitation);
        this.notificationStore.addNotification();
    }

    public static async getAllInvitations(userEmail: string): Promise<Invitation[]> {
        return $api.get(`/users/${userEmail}/invitations?page=0&size=5`)
            .then((response) => {
                if(response) {
                    return response.data;
                }
                return response;
            }).catch((er) => {
                if(er.response) {
                    toast.error(er.response.data.message);
                }
                throw er;
            });
    }

    public static async acceptInvitation(invitationId: number) {
        return $api.post(`/invitations/${invitationId}/accept`)
            .then((response) => {
                if(response) {
                    return response.data;
                }
                return response;
            }).catch((er) => {
                if(er.response) {
                    toast.error('Can\'t accept invitation due to: ' + er.response.data.message);
                }
                throw er;
            });
    }

    static async inviteMember(organizationId: number, userEmail: string) {
        return $api.post(`/organizations/${organizationId}/user/${userEmail}/invite`);
    }
}

export default InvitationService;