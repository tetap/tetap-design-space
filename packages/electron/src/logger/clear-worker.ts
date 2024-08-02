import fs from 'fs'
import path from 'path'
import { workerData } from 'worker_threads'

// 日志文件清理
const day = 7 // 日志保留天数
;(async () => {
  const { base } = workerData
  const date = new Date()
  const logPath = path.normalize(`${base}`)
  const dirs = await fs.promises.readdir(logPath)
  for (const dir of dirs) {
    const dirPath = path.join(logPath, dir)
    const stat = await fs.promises.stat(dirPath)
    // 如何文件创建时间距今超过${day}天，则删除
    if (
      stat.isDirectory() &&
      stat.birthtime.getTime() < date.getTime() - day * 24 * 60 * 60 * 1000
    ) {
      await fs.promises.rm(dirPath, { recursive: true }).catch((err) => {
        console.error('clear-worker unlink error:', err)
      })
    }
  }
})()
