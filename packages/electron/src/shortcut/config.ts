import type { BrowserWindow } from 'electron'

/*
 *@description: 全局快捷键配置
 *@author: zyc
 *@date-time: 2023-09-12 11:31:05
 */
export interface IShortcutConfig {
  code: string
  handle: (window?: BrowserWindow) => void
}

export const shortcutList: IShortcutConfig[] = [
  {
    code: 'CommandOrControl+Shift+i',
    handle: (window) => window?.webContents?.toggleDevTools()
  }
]
