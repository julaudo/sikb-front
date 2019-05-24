import Component from 'vue-class-component';
import {Mixins, Prop} from 'vue-property-decorator';
import Utils from '@/utils/utils';
import {Getter} from 'vuex-class';


@Component
export default class EntityForm<T> extends Mixins(Utils) {
    @Getter public userToken!: string;
    @Prop() public entity!: T;

    protected valid = null;
    protected entityBackup!: T;
    protected saving = false;
    protected deleting = false;

    public mounted() {
        this.entityBackup = this.copy(this.entity);
    }

    protected reset() {
        this.copy(this.entityBackup, this.entity);
    }

    protected validateDisabled() {
        return !this.valid || this.equals(this.entity, this.entityBackup) || this.saving;
    }

    protected cancelDisabled() {
        return this.equals(this.entity, this.entityBackup);
    }
}
