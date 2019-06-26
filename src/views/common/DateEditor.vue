<template>
    <div>
    <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            :position-x="x"
            :position-y="y"
            full-width
            min-width="290px">
        <v-date-picker
                v-model="date"
                :rules="[required()]"
                @input="menu = false"></v-date-picker>
    </v-menu>

    <v-text-field
            @blur="blur()"
            v-model="dateFormatted"
            @click:prepend="click"
            :label="label"
            :rules="rules"
            prepend-icon="event">
    </v-text-field>
    </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Watch} from 'vue-property-decorator';
import Utils from '@/utils/utils';
import Validators from '@/utils/validators';

@Component
export default class DateEditor extends Mixins(Utils, Validators) {
    @Prop() public value!: string;
    @Prop() public label!: string;
    @Prop() public rules!: string;

    private menu = false;
    private dateFormatted = '';
    private x = 0;
    private y = 0;

    @Watch('date', { immediate: true, deep: true })
    private watchDate(date: string) {
        this.dateFormatted = this.formatDate(this.date);
    }

    private click(e: MouseEvent) {
        this.menu = true;
        this.x = e.clientX;
        this.y = e.clientY;
    }

    public get date() {
        return this.value;
    }

    public set date(date: string) {
        this.$emit('input', date);
        this.dateFormatted = this.formatDate(date);
    }

    private blur() {
        if (this.dateFormatted === '') {
            this.date = '';
        } else if (this.isValidDate(this.dateFormatted)) {
            const parsedDate = this.parseDate(this.dateFormatted);
            if (parsedDate != this.date) { /* tslint:disable-line:triple-equals */
                this.date = parsedDate;
            }
        } else {
            this.dateFormatted = this.formatDate(this.value);
        }
    }

    private isValidDate(date: string) {
        const [day, month, year] = date.split('/');
        const d = new Date(+year, +month - 1, +day);
        return d.getFullYear() === +year && d.getMonth() === +month - 1 && d.getDate() === +day;
    }

    private formatDate(date: string) {
        if (!date) {
            return '';
        }

        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }

    private parseDate(date: string) {
        const [day, month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
}
</script>
