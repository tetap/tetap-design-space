/** 窗口默认事件拦截 */
import { BrowserWindow, shell } from 'electron'

export function configureWindow(window: BrowserWindow) {
  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
}
