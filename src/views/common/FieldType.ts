import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class FieldType extends Vue {
    public readonly TYPE_DATE = 'date';
    public readonly TYPE_IMAGE = 'image';
    public readonly TYPE_ACTION = 'action';

}
