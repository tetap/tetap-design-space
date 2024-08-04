import { BrowserWindow } from 'electron'
import { initNav } from './src/nav'
import { initExtension } from './src/extension'

export function mainIpc(window: BrowserWindow) {
  initNav(window)
  initExtension(window)
}
