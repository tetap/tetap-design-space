import { app, BrowserWindow } from 'electron'
import { createWindow } from './window/mainWindow'
import { installShortcut, unInstallShortcut } from './shortcut'
import { fork } from 'child_process'
import './utils/command'
;(async () => {
  // 禁止应用创建多个
  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) return app.quit()
  await app.whenReady()
  let mainWindow = await createWindow()
  for (let i = 0; i < 100; i++) {
    console.log(
      fork('-v', {
        stdio: 'pipe'
      }).on('message', (res) => {
        console.log(123, res)
      })
    )
  }

  // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他打开的窗口，那么程序会重新创建一个窗口。
  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = await createWindow()
    }
  })

  // 保持单例窗口
  app.on('second-instance', () => {
    if (!mainWindow) return
    mainWindow.show()
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  })

  // 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 macOS窗口全部关闭时,dock中程序不会退出
  app.on('window-all-closed', () => {
    app.quit()
  })

  // 客户端聚焦
  app.on('browser-window-focus', () => {
    // 注册快捷键
    installShortcut(mainWindow)
  })
  // 客户端失去焦点
  app.on('browser-window-blur', () => {
    // 注销快捷键
    unInstallShortcut()
  })
  app.on('will-quit', () => {
    // 注销快捷键
    unInstallShortcut()
  })
})()
