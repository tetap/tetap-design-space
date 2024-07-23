import { BrowserWindow } from 'electron'
import { initNav } from './src/nav'

export function mainIpc(window: BrowserWindow) {
  initNav(window)
}
