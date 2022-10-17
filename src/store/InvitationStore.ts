import { makeAutoObservable } from 'mobx';
import Invitation from '../type/Invitation';

export class InvitationStore {

    private static instance: InvitationStore;
    private invitations: Invitation[] = [];

    private constructor() {
        makeAutoObservable(this);
    }

    public static getInstance = (): InvitationStore => {
        if (!this.instance) {
            this.instance = new InvitationStore();
        }
        return this.instance;
    };

    public addInvitation = (invitation: Invitation) => {
        this.invitations.push(invitation);
    };

    public setInvitations = (invitations: Invitation[]) => {
        this.invitations = invitations;
    };

    public getInvitations = (): Invitation[] => {
        return this.invitations;
    };
}