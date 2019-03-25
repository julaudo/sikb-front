<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {AxiosPromise, AxiosResponse} from 'axios';
import {ObjectWithId} from '@/model/model';
import {Getter} from 'vuex-class';

@Component
export default class CrudParent extends Vue {
    @Getter public userToken!: string;

    public headers: any[] = [];
    protected items: ObjectWithId[] = [];

    protected refreshing = false;

    public mounted() {
        this.refreshItems();
    }

    public getDeletePromise(id: number): AxiosPromise<Response> | undefined  {
        return undefined;
    }

    public getCreatePromise(item: object): AxiosPromise<ObjectWithId> | undefined  {
        return undefined;
    }

    public getUpdatePromise(item: ObjectWithId): AxiosPromise | undefined  {
        return undefined;
    }

    public getRefreshPromise(): AxiosPromise<ObjectWithId[]> | undefined {
        return undefined;
    }

    public refreshItems() {
        this.refreshing = true;
        this.getRefreshPromise()!.then((response: AxiosResponse<any[]>) => {
            this.items = response.data;
            this.refreshing = false;
        }).catch(() => {
            this.refreshing = false;
        });
    }

    public deleteItem(id: number, successCallback: any) {
        this.getDeletePromise(id)!.then(() => {
            this.items = this.items.filter((c) => c.id !== id);
            successCallback(true);
        }).catch(() => {
            successCallback(false);
        });
    }

    public updateItem(item: ObjectWithId, successCallback: any) {
        this.getUpdatePromise(item)!.then(() => {
            const index = this.items.findIndex((c) => c.id === item.id);
            Object.assign(this.items[index], item);
            successCallback(true);
        }).catch(() => {
            successCallback(false);
        });
    }

    public createItem(item: object, successCallback: any) {
        this.getCreatePromise(item)!.then((response: AxiosResponse) => {
            this.items.push(response.data);
            successCallback(true);
        }).catch(() => {
            successCallback(false);
        });
    }
}
</script>
