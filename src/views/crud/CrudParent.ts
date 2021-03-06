import { Component, Vue } from 'vue-property-decorator';
import {AxiosPromise, AxiosResponse} from 'axios';
import {ObjectWithId} from '@/model/model';
import {Getter} from 'vuex-class';

@Component
export default class CrudParent extends Vue {
    @Getter public userToken!: string;

    public headers: any[] = [];
    public items: ObjectWithId[] = [];

    public refreshing = false;

    public created() {
        this.refreshItems();
    }

    public getDeletePromise(id: number): AxiosPromise<Response> {
        return Promise.reject();
    }

    public getCreatePromise(item: object): AxiosPromise<ObjectWithId> {
        return Promise.reject();
    }

    public getUpdatePromise(item: ObjectWithId): AxiosPromise  {
        return Promise.reject();
    }

    public getRefreshPromise(): AxiosPromise<ObjectWithId[]> {
        return Promise.reject();
    }

    public refreshItems() {
        this.refreshing = true;
        const promise = this.getRefreshPromise();
        promise.then((response: AxiosResponse<any[]>) => {
            this.items = response.data;
            this.refreshing = false;
        }).catch(() => {
            this.refreshing = false;
        });

        return promise;
    }

    public deleteItem(id: number, successCallback: any) {
        this.getDeletePromise(id).then(() => {
            this.items = this.items.filter((c) => c.id !== id);
            successCallback(true);
        }).catch(() => {
            successCallback(false);
        });
    }

    public updateItem(item: ObjectWithId, successCallback: any) {
        this.getUpdatePromise(item).then(() => {
            const index = this.items.findIndex((c) => c.id === item.id);
            Object.assign(this.items[index], item);
            successCallback(true);
        }).catch(() => {
            successCallback(false);
        });
    }

    public createItem(item: object, successCallback: any) {
        this.getCreatePromise(item).then((response: AxiosResponse) => {
            this.items.push(response.data);
            successCallback(true);
        }).catch(() => {
            successCallback(false);
        });
    }
}
