export default class Logger {
    public static log(message: string, obj: unknown): void {
        console.log(Logger.format(message), obj);
        Logger.trace();
    }

    public static info(message: string, obj: unknown): void {
        console.info(Logger.format(message), obj);
        Logger.trace();
    }

    public static error(message: string, obj: unknown): void {
        console.error(Logger.format(message), obj);
        Logger.trace();
    }

    private static trace(): void {
        console.trace();
    }

    private static format(message: string): string {
        return `[LOGGER] ${ message.endsWith(":") ? message : `${ message }:` }`;
    }
}