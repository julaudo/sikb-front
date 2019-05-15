<template>

    <div>
        <v-layout row wrap>
            <v-flex xs6 sm6 md6>
                <v-text-field
                        v-model="board.president.name"
                        :label="$t('affiliation.board.president')"
                        :rules="[required()]"
                        prepend-icon="person"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 sm6 md6>
                <SexVue v-model="board.president.sex" />
            </v-flex>

            <v-flex xs6 sm6 md6>
                <v-text-field
                        v-model="board.secretary.name"
                        :label="$t('affiliation.board.secretary')"
                        :rules="[required()]"
                        prepend-icon="person"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 sm6 md6>
                <SexVue v-model="board.secretary.sex" />
            </v-flex>

            <v-flex xs6 sm6 md6>
                <v-text-field
                        v-model="board.treasurer.name"
                        :label="$t('affiliation.board.treasurer')"
                        :rules="[required()]"
                        prepend-icon="person"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 sm6 md6>
                <SexVue v-model="board.treasurer.sex" />
            </v-flex>

            {{board.electedDate}}
            <v-flex xs12 sm12 md12>
                <DateEditor
                        v-model="board.electedDate"
                        :label="$t('affiliation.board.electedDate')" />
            </v-flex>

            <v-flex xs12 sm12 md12>
                <v-text-field
                        class="inputNumber"
                        type="number"
                        v-model="board.membersNumber"
                        :label="$t('affiliation.board.membersNumber')"
                        :rules="[required()]"
                        style="max-width: 20em"
                        prepend-icon="group"
                ></v-text-field>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator';
import Utils from '@/utils/utils';
import Validators from '@/utils/validators';
import {Board} from '@/generated';
import SexVue from '@/views/common/SexVue.vue';
import DateEditor from '@/views/common/DateEditor.vue';
@Component({
    components: {DateEditor, SexVue},
})
export default class BoardVue extends Mixins(Utils, Validators) {
    @Prop() public value!: Board;

    get board() {
        return this.value;
    }

    set board(board: Board) {
        this.$emit('input', board);
    }
}
</script>
