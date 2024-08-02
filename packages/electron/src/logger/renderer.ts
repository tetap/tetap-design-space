import { contextBridge } from 'electron'
import logger from 'electron-log/renderer'

const log = logger.scope('renderer')

contextBridge.exposeInMainWorld('logger', log)
