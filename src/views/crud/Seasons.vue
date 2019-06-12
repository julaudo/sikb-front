<template>
    <crud
            :items = items
            :headers = headers
            :crudKey = "'seasons'"
            :refreshing="refreshing"
            @deleteItem = deleteItem
            @createItem = createItem
            @updateItem = updateItem
            @refreshItems = refreshItems
    />
</template>


<script lang="ts">
import Component from 'vue-class-component';
import {
    ConfigurationsApi,
    Season,
    SeasonForCreation,
} from '../../generated';
import {AxiosPromise} from 'axios';
import {Mixins} from 'vue-property-decorator';
import CrudParent from '@/views/crud/CrudParent.ts';
import FieldType from '@/views/common/FieldType';
import Validators from '@/utils/validators';
import Crud from '@/views/common/Crud.vue';
import {baseOptions} from '@/utils/options';

@Component({
    components: {Crud},
})
export default class Seasons extends Mixins(CrudParent, FieldType, Validators) {

    public created() {
        this.headers = [
            {
                align: 'left',
                sortable: true,
                value: 'description',
                prepend_icon: 'far fa-comment-dots',
                width: '40%',
                required: true,
            },
            {
                align: 'left',
                sortable: true,
                value: 'begin',
                prepend_icon: 'far fa-calendar-alt',
                type: this.TYPE_DATE,
                width: '30%',
                required: true,
            },
            {
                align: 'left',
                sortable: true,
                value: 'end',
                prepend_icon: 'far fa-calendar-alt',
                type: this.TYPE_DATE,
                width: '30%',
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

    public getRefreshPromise(): AxiosPromise<Season[]> {
        return new ConfigurationsApi(baseOptions).findSeasons(this.userToken);
    }

    public getDeletePromise(id: number): AxiosPromise<Response> {
        return new ConfigurationsApi(baseOptions).deleteSeason(this.userToken, id.toString());
    }

    public getCreatePromise(item: SeasonForCreation): AxiosPromise {
        return new ConfigurationsApi(baseOptions).createSeason(this.userToken, item);
    }

    public getUpdatePromise(item: Season): AxiosPromise<Season> {
        return new ConfigurationsApi(baseOptions).updateSeason(this.userToken, item.id, item);
    }
}
</script>
