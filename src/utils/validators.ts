import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Validators extends Vue {

    public required(message: string = 'validator.field.required') {
        return (v: any) => !!v || this.$t(message);
    }


    public phoneNumber() {
        return (v: any) => !v || /0[\d]{9}/.test(v) || this.$t('validator.phoneNumber');
    }

    public mail() {
        return (v: any) => /.+@.+/.test(v) || this.$t('validator.mail');
    }

    public maxLength(length: number) {
        return (v: any) => !v || v.length <= length || this.$t('validator.maxLength', [length]);
    }
}
