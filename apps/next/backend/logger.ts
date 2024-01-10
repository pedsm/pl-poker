import Pino, { Logger } from 'pino'

const logger: Logger = Pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
})

export default logger