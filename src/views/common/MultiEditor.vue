<template>
    <v-combobox
            v-model="chips"
            :items="items"
            :item-value="itemValue"
            :label="label"
            :light="false"
            small-chips
            clearable
            multiple
    >
        <template slot="item" slot-scope="data">
            <div class="v-list__tile__action">
                <v-checkbox
                        color=primary
                        :value="data.tile.props.value"
                ></v-checkbox>
            </div>
            <div class="v-list__tile__title">{{itemText.print(data.item)}}
            </div>
        </template>
        <template slot="selection" slot-scope="data">
            <v-tooltip bottom open-delay="500">
                <template v-slot:activator="{ on }">
                    <v-chip
                            v-on="on"
                            :selected="data.selected"
                            close
                            small
                            @input="remove(data.item)"
                    >
                        {{ chipText.print(data.item) }}
                    </v-chip>
                </template>
                <span>{{itemText.print(data.item)}}</span>

            </v-tooltip>
        </template>
    </v-combobox>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator';
import Utils from '@/utils/utils';
import Validators from '@/utils/validators';
import {Printer} from '@/utils/printer';

@Component
export default class MultiEditor<T> extends Mixins(Utils, Validators) {
    @Prop() public value!: T[];
    @Prop() public items!: T[];
    @Prop({default: 'name'}) public itemText!: Printer;
    @Prop({default: 'name'}) public chipText!: Printer;
    @Prop({default: 'id'}) public itemValue!: string | (() => string);
    @Prop() public format!: (t: T) => string;
    @Prop() public label!: string;

    public get chips(): T[] {
        return this.value;
    }

    public set chips(items: T[]) {
        this.$emit('input', items);
    }

    public remove(item: T) {
        this.chips.splice(this.chips.indexOf(item), 1);
        this.chips = [...this.chips];
    }

}
</script>
