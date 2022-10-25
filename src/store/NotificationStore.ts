import { makeAutoObservable } from 'mobx';

export class NotificationStore {

    private count = 0;

    private static instance: NotificationStore;

    private constructor() {
        makeAutoObservable(this);
    }

    public static getInstance = (): NotificationStore => {
        if (!this.instance) {
            this.instance = new NotificationStore();
        }
        return this.instance;
    };

    public addNotification() {
        this.count = this.count + 1;
    }

    public getCount() {
        return this.count;
    }

    public setCount(count: number) {
        this.count = count;
    }
}