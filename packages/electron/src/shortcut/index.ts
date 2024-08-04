import { BrowserWindow, globalShortcut } from 'electron'
import { shortcutList } from './config'

export function installShortcut() {
  shortcutList.forEach((shortcut) => {
    globalShortcut.register(shortcut.code, () => {
      const window = BrowserWindow.getFocusedWindow()
      shortcut.handle(window)
    })
  })
}

export function unInstallShortcut() {
  // 注销所有快捷键
  globalShortcut.unregisterAll()
}
