<template>
    <crud
            :items = items
            :headers = headers
            :crudKey = "'users'"
            :refreshing="refreshing"
            @deleteItem = deleteItem
            @createItem = createItem
            @updateItem = updateItem
            @refreshItems = refreshItems
    />
</template>


<script lang="ts">
import Component from 'vue-class-component';
import {Club, ClubsApi, ConfigurationsApi, ProfileType, User, UsersApi} from '@/generated';
import {AxiosPromise, AxiosResponse} from 'axios';
import {baseOptions} from '@/utils/options';
import {Mixins} from 'vue-property-decorator';
import CrudParent from '@/views/crud/CrudParent.vue';
import FieldType from '@/views/common/FieldType';
import Validators from '@/utils/validators';
import Crud from '@/views/common/Crud.vue';
import Utils from '@/utils/utils';
import {Printer} from '@/utils/printer';

@Component({
    components: {Crud},
})
export default class Users extends Mixins(CrudParent, FieldType, Validators, Utils) {
    public profiles: ProfileType[] = [];
    public clubs: Club[] = [];
    public clubIds: number[] = [];

    public created() {
        this.headers = [
            {
                align: 'left',
                sortable: true,
                value: 'email',
                prepend_icon: 'fa-at',
                width: '33%',
                validators: [this.mail()],
                required: true,
            },
            {
                align: 'left',
                sortable: true,
                value: 'profile.type',
                itemText: new Printer('name'),
                itemValue: new Printer('id'),
                width: '33%',
                required: true,
                type: this.TYPE_LIST,
                list: this.profiles,
            },
            {
                align: 'left',
                sortable: true,
                value: 'profile.clubIds',
                itemText: new Printer((e: number) => this.clubs.filter((i) => i.id === e)[0].name),
                itemValue: new Printer('value'),
                chipText: new Printer((e: number) => this.clubs.filter((i) => i.id === e)[0].shortName),
                width: '33%',
                type: this.TYPE_LIST_MULTI,
                list: this.clubIds,
            },
            {
                value: 'edit',
                type: this.TYPE_ACTION,
            },
            {
                value: 'delete',
                type: this.TYPE_ACTION,
            },
        ];
    }

    public getRefreshPromise(): AxiosPromise<User[]> {
        const clubsPromise = new ClubsApi(baseOptions).findClubs(this.userToken);
        const profilesPromise = new ConfigurationsApi(baseOptions).findProfileTypes(this.userToken);
        const usersPromise = new UsersApi(baseOptions).findUsers(this.userToken);

        const result: Promise<AxiosResponse<User[]>> = clubsPromise.then((r) => {
            this.initArray(this.clubs, r.data);
            this.initArray(this.clubIds, r.data.sort((a, b) => a.name.localeCompare(b.name)).map((c) => c.id));
            return profilesPromise;
        }, () => {
            return profilesPromise;
        }).then((r) => {
            this.initArray(this.profiles, r.data.sort((a, b) => a.name.localeCompare(b.name)));
            return usersPromise;
        }, () => {
            return usersPromise;
        });

        return result;
    }

    public getDeletePromise(id: number): AxiosPromise<Response> {
        return new UsersApi(baseOptions).deleteUser(this.userToken, id);
    }

    public getCreatePromise(user: User): AxiosPromise {
        return new UsersApi(baseOptions).createUser(this.userToken, user);
    }

    public getUpdatePromise(user: User): AxiosPromise {
        return new UsersApi(baseOptions).updateUser(this.userToken, user.id, user);
    }
}
</script>
