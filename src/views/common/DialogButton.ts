export class DialogButton {

    public working = false;

    constructor(private title: string, private id: string, private click: () => Promise<any>) {
    }

    public get clickPromise() {
        return this.click;
    }
}
