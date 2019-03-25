<template>

    <v-radio-group v-model="sex" :mandatory="true" row>
        <v-radio :label="$t('sex.male')" color="primary" :value="MALE"></v-radio>
        <v-radio :label="$t('sex.female')" color="primary" :value="FEMALE"></v-radio>
    </v-radio-group>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator';
import Utils from '@/utils/utils';
import Validators from '@/utils/validators';
import {Sex} from '@/generated';

@Component
export default class AffiliationVue extends Mixins(Utils, Validators) {
    @Prop() public value!: Sex;

    private MALE = Sex.MALE;
    private FEMALE = Sex.FEMALE;

    get sex() {
        return this.value;
    }

    set sex(sex: Sex) {
        this.$emit('input', sex);
    }
}
</script>
