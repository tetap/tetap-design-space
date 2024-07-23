import { BrowserWindow, ipcMain } from 'electron'

export function initNav(window: BrowserWindow) {
  ipcMain.on('window-nav-event', (_, arg) => {
    switch (arg) {
      case 'minimize':
        window.minimize()
        break
      case 'restore':
        if (window.isMaximized()) {
          window.unmaximize()
        } else {
          window.maximize()
        }
        window.webContents.send('window-nav-restore', window.isMaximized())
        break
      case 'close':
        window.close()
        break
      default:
        return
    }
  })
  window.addListener('maximize', () => {
    window.webContents.send('window-nav-restore', true)
  })
  window.addListener('unmaximize', () => {
    window.webContents.send('window-nav-restore', false)
  })
}
