import fs from 'fs'
import path from 'path'
import { workerData } from 'worker_threads'

// 日志文件清理

const base = workerData.base
const date = new Date()
const logPath = path.normalize(`${base}`)
if (!fs.existsSync(logPath)) {
  process.exit(0)
}
;(async () => {
  const dirs = await fs.promises.readdir(logPath)
  // 计算文件夹大小 如果文件大小超过50MB，则删除12小时前的文件 否则保留7天
  const size = await fs.promises.stat(logPath).then((stat) => stat.size)
  const max = size > 50 * 1024 * 1024 ? 0.5 : 7
  for (const dir of dirs) {
    const dirPath = path.join(logPath, dir)
    const stat = await fs.promises.stat(dirPath)
    // 如何文件创建时间距今超过${max}天，则删除
    if (
      stat.isDirectory() &&
      stat.birthtime.getTime() < date.getTime() - max * 24 * 60 * 60 * 1000
    ) {
      await fs.promises.rm(dirPath, { recursive: true }).catch((err) => {
        console.error('clear-worker unlink error:', err)
      })
    }
  }
  process.exit(0)
})()
