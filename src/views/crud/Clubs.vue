<template>
    <crud
            :items = items
            :headers = headers
            :crudKey = "'clubs'"
            :refreshing="refreshing"
            @deleteItem = deleteItem
            @createItem = createItem
            @updateItem = updateItem
            @refreshItems = refreshItems
            @affiliations = affiliations
    />
</template>

<script lang="ts">
import Component from 'vue-class-component';
import {Club, ClubsApi} from '@/generated';
import {baseOptions} from '@/main';
import {AxiosPromise} from 'axios';
import CrudParent from '@/views/crud/CrudParent.vue';
import {Mixins} from 'vue-property-decorator';
import FieldType from '@/views/common/FieldType';
import Validators from '@/utils/validators';
import Crud from '@/views/common/Crud.vue';
@Component({
    components: {Crud},
})
export default class Clubs extends Mixins(CrudParent, FieldType, Validators) {

    public created() {
        this.headers = [
            {
                align: 'left',
                sortable: true,
                value: 'logo.location',
                width: '40px',
                type: this.TYPE_IMAGE,
            },
            {
                align: 'left',
                sortable: true,
                value: 'name',
                width: '75%',
                required: true,
                validators: [this.maxLength(255)],
            },
            {
                value: 'shortName',
                width: '15%',
                required: true,
                validators: [this.maxLength(255)],
            },
            {
                value: 'affiliations',
                icon: 'fa-file-signature',
                type: this.TYPE_ACTION,
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

    public getCreatePromise(item: Club): AxiosPromise {
        return new ClubsApi(baseOptions).createClub(this.userToken, item);
    }

    public getDeletePromise(id: number): AxiosPromise<Response> {
        return new ClubsApi(baseOptions).deleteClub(this.userToken, id);
    }

    public getRefreshPromise(): AxiosPromise<Club[]> {
        return new ClubsApi(baseOptions).findClubs(this.userToken);
    }

    public getUpdatePromise(item: Club): AxiosPromise {
        return new ClubsApi(baseOptions).updateClub(this.userToken, item.id, item);
    }

    public affiliations() {
        alert('affiliations');
    }

}
</script>
