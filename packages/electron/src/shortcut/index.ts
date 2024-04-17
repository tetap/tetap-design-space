import { BrowserWindow, globalShortcut } from 'electron'
import { shortcutList } from './config'

export function installShortcut(window: BrowserWindow) {
  shortcutList.forEach((shortcut) => {
    globalShortcut.register(shortcut.code, () => {
      shortcut.handle(window)
    })
  })
}

export function unInstallShortcut() {
  // 注销所有快捷键
  globalShortcut.unregisterAll()
}
