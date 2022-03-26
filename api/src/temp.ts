export const foo = (logger: Logger) => {
    logger.log('doing foo');
}


export interface Logger {
    log(message: string): void
}


const logger = (module?: string):Logger => ({
    log: string => console.log(Date.now(), module, string)
})







