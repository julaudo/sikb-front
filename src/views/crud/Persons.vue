<template>
    <crud
            :items = items
            :headers = headers
            :crudKey = "'persons'"
            :refreshing="refreshing"
            @deleteItem = deleteItem
            @createItem = createItem
            @updateItem = updateItem
            @refreshItems = refreshItems
    />
</template>


<script lang="ts">
import Component from 'vue-class-component';
import {Person, PersonsApi} from '@/generated';
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
export default class Persons extends Mixins(CrudParent, FieldType, Validators) {

    public created() {
        this.headers = [
            {
                align: 'left',
                sortable: true,
                value: 'name',
                prepend_icon: 'fa-user',
                width: '30%',
                required: true,
            },
            {
                align: 'left',
                sortable: true,
                value: 'firstName',
                prepend_icon: 'fa-user',
                width: '30%',
                required: true,
            },
            {
                align: 'left',
                sortable: true,
                value: 'email',
                prepend_icon: 'fa-at',
                width: '30%',
                required: true,
            },
            {
                align: 'left',
                sortable: true,
                value: 'birthDate',
                prepend_icon: 'fa-birthday-cake',
                type: 'date',
                width: '30%',
            },
            {
                align: 'left',
                sortable: true,
                value: 'address',
                prepend_icon: 'place',
                width: '30%',
            },
            {
                align: 'left',
                sortable: true,
                value: 'postalCode',
                width: '30%',
            },
            {
                align: 'left',
                sortable: true,
                value: 'city',
                width: '30%',
            },
            {
                align: 'left',
                sortable: true,
                value: 'phoneNumber',
                prepend_icon: 'smartphone',
                width: '30%',
            },
            {
                align: 'left',
                sortable: true,
                value: 'nationality',
                prepend_icon: 'fa-globe-europe',
                width: '30%',
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

    public getRefreshPromise(): AxiosPromise<Person[]> {
        return new PersonsApi(baseOptions).findPersons(this.userToken);
    }

    public getDeletePromise(id: number): AxiosPromise<Response> {
        return new PersonsApi(baseOptions).deletePerson(this.userToken, id);
    }

    public getCreatePromise(person: Person): AxiosPromise {
        return new PersonsApi(baseOptions).createPerson(this.userToken, person);
    }

    public getUpdatePromise(item: Person): AxiosPromise {
        return new PersonsApi(baseOptions).updatePerson(this.userToken, item.id, item);
    }
}
</script>
