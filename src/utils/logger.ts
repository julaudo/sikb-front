/* tslint:disable:no-console */
export class Logger {
    public static info(msg: any) {
        console.info(msg);
    }

    public static warn(msg: any) {
        console.warn(msg);
    }

    public static error(msg: any) {
        console.error(msg);
    }

    private static isProduction = process.env.NODE_ENV === 'production';
}
