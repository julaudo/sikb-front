import Vue from 'vue';
import Component from 'vue-class-component';
import {TranslateResult} from 'vue-i18n';

@Component
export default class Utils extends Vue {
    public resolveProperty(path: string, obj: any): any {
        return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj || self);
    }

    public translate(key: string, fallbackKey: string): TranslateResult {
        if (this.$te(key)) {
            return this.$t(key);
        } else {
            return this.$t(fallbackKey);
        }
    }

    public copy(src: any, dst: any = {}): any {
        Object.assign(dst, JSON.parse(JSON.stringify(src)));

        return dst;
    }

    public equals(first: any, second: any): boolean {
        if (first === null || first === undefined) {
            return second === null || second === undefined;
        } else if (second === null || second === undefined) {
            return false;
        } else {
            return JSON.stringify(first) === JSON.stringify(second);
        }
    }

    public omit(object: any, prop: string) {
        const res = this.copy(object);
        delete res[prop];

        return res;
    }
}
