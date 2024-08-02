/*
 *@description: 渲染层日志
 *@author: tetap
 *@date-time: 2023-09-19 09:24:39
 */
export default function () {
  if (!window.logger || import.meta.env.MODE === 'development') return
  const log = console.log
  const error = console.error
  const warn = console.warn
  const debug = console.debug
  const info = console.info
  console.log = (...data) => {
    try {
      window.logger.log(JSON.stringify(data))
    } catch (error) {
      //
    }
    log(...data)
  }
  console.error = (...data) => {
    try {
      window.logger.error(JSON.stringify(data))
    } catch (error) {
      //
    }
    error(...data)
  }
  console.warn = (...data) => {
    try {
      window.logger.warn(JSON.stringify(data))
    } catch (error) {
      //
    }
    warn(...data)
  }
  console.info = (...data) => {
    try {
      window.logger.log(JSON.stringify(data))
    } catch (error) {
      //
    }
    info(...data)
  }
  console.debug = (...data) => {
    try {
      window.logger.log(JSON.stringify(data))
    } catch (error) {
      //
    }
    debug(...data)
  }
}

/**
 * 打开日志目录
 */
export function openLoggerPath() {
  window.ipc.invoke('logger:open')
}

/**
 * 变更日志级别
 */
export function updateLoggerLevel(level: string) {
  window.ipc.invoke('logger:level', level)
}
