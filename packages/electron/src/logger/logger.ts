import logger from 'electron-log'
import path from 'path'
import { app } from 'electron'
import { Worker } from 'worker_threads'

logger.initialize()

logger.transports.file.level = 'debug'
logger.transports.file.maxSize = 1002430 // 10M
logger.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}] [{level}]{scope} {text}'
logger.transports.console.level = 'debug'

logger.transports.file.resolvePathFn = resolvePath

const base = path.parse(app.getPath('exe')).dir + '/logs/'

function resolvePath(_: logger.PathVariables, message?: logger.LogMessage | undefined) {
  const date = new Date()
  const datePath = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  const scopePath = message.scope ? `/${message.scope}/` : ''
  const name = `${datePath}.log`
  return path.normalize(`${base}/${datePath}/` + scopePath + name)
}

new Worker(path.join(__dirname, '../logger', 'clear-worker.js'), { workerData: { base } })
