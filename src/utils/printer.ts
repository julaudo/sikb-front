export class Printer {
    constructor(private p: string | ((o: any) => any)) {

    }

    public print(o: any) {
        if (typeof this.p === 'function') {
            return this.p(o);
        }
        return o[this.p];
    }

    public get printer() {
        return this.p;
    }
}
