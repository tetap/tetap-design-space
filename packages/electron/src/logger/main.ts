import './logger'
import logger from 'electron-log'

const log = logger.scope('main')

console.log = log.log
console.warn = log.warn
console.error = log.error
console.info = log.info
