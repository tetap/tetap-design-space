import { app } from 'electron'
import path from 'path'
import fs from 'fs'

export const config = {
  cachePath: path.parse(app.getPath('exe')).dir + '/cache/', // 缓存目录
  downloadPath: app.getPath('documents') + '/tetap/' // 下载目录
}

// 创建缓存目录
if (!fs.existsSync(config.cachePath)) {
  fs.mkdirSync(config.cachePath, { recursive: true })
}

// 创建下载目录
if (!fs.existsSync(config.downloadPath)) {
  fs.mkdirSync(config.downloadPath, { recursive: true })
}
