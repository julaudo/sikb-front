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
import {User, UsersApi} from '@/generated';
import {AxiosPromise} from 'axios';
import {baseOptions} from '@/utils/options';
import {Mixins} from 'vue-property-decorator';
import CrudParent from '@/views/crud/CrudParent.vue';
import FieldType from '@/views/common/FieldType';
import Validators from '@/utils/validators';
import Crud from '@/views/common/Crud.vue';

@Component({
    components: {Crud},
})
export default class Users extends Mixins(CrudParent, FieldType, Validators) {

    public created() {
        this.headers = [
            {
                align: 'left',
                sortable: true,
                value: 'email',
                prepend_icon: 'fa-at',
                width: '100%',
                validators: [this.mail()],
                required: true,
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
        return new UsersApi(baseOptions).findUsers(this.userToken);
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
