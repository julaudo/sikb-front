import Vue from 'vue';
import Component from 'vue-class-component';
import {TranslateResult} from 'vue-i18n';

@Component
export default class Utils extends Vue {
    public resolveProperty(path: string, obj: any): any {
        return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj || self);
    }

    public setProperty(path: string, obj: any, value: any): any {
        const split: string[] = path.split('.');
        const first = split[0];
        const last = split.pop() as string;

        const copy = this.copy(obj);

        split.reduce((prev, curr) => {
            if (prev) {
                if (!prev.hasOwnProperty(curr)) {
                    prev[curr] = {};
                }
                return prev[curr];
            }
        }, copy || self)[last] = value;

        // Réaffectation de l'objet racine, afin de déclencher les observers
        obj[first] = copy[first];
    }

    public initArray(to: any[], from: any[]) {
        to.splice(0, to.length);
        from.forEach((e) => to.push(e));
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
            const isEqual = require('lodash.isequal');
            return isEqual(first, second);
        }
    }

    public omit(object: any, prop: string) {
        const res = this.copy(object);
        delete res[prop];

        return res;
    }
}
