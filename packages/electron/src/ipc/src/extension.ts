import { BrowserWindow, ipcMain, BaseWindowConstructorOptions } from 'electron'
import path from 'path'

type StoreType = {
  name: string
  title: string
  icon: string
  src: string
  version: string
  windowOptions: BaseWindowConstructorOptions
}

const NODE_ENV = process.env.NODE_ENV === 'development'

class ExtensionWindowManager {
  private windows: Map<string, { info: StoreType; window: BrowserWindow }> = new Map()

  async open(store: StoreType) {
    const id = store.name
    const { window } = this.windows.get(id) || {}
    if (window) {
      window.show()
      window.focus()
      return
    }

    const extensionWindow = await this.createExtensionWindow(store)
    this.windows.set(id, { info: store, window: extensionWindow })
    extensionWindow.on('closed', () => {
      this.windows.delete(id)
    })
    return extensionWindow
  }

  async createExtensionWindow(store: StoreType) {
    return new Promise<BrowserWindow>((resolve) => {
      const options = store.windowOptions
      const window = new BrowserWindow({
        ...options,
        fullscreenable: false, //禁止F11全屏
        modal: false,
        show: false,
        frame: false, // * app边框(包括关闭,全屏,最小化按钮的导航栏) @false: 隐藏
        transparent: false, // * app 背景透明
        hasShadow: false, // * app 边框阴影
        webPreferences: {
          preload: path.join(__dirname, '../../', 'preload'), // 加载脚本
          backgroundThrottling: false,
          nodeIntegration: true, // 渲染层可以使用node
          contextIsolation: true, //允许渲染进程使用nodejs
          webviewTag: true, // 允许使用webview标签
          webSecurity: false // 跨域
        }
      })
      const uri = NODE_ENV
        ? `http://localhost:18181/#/extension/${store.name}`
        : `file://${path.resolve(__dirname, '../../')}/index.html/#/extension/${store.name}`
      window.loadURL(uri)
      if (NODE_ENV) {
        window.setAlwaysOnTop(true)
      }
      window.once('ready-to-show', () => {
        window.show()
        resolve(window)
      })
    })
  }

  getExtensionInfo(id: string) {
    return this.windows.get(id)
  }
}

export function initExtension() {
  const extensionWindowManager = new ExtensionWindowManager()
  ipcMain.handle('open-extension', (_, store: StoreType) => {
    extensionWindowManager.open(store)
  })
  ipcMain.handle('get-extension-info', (_, id: string) => {
    const { info } = extensionWindowManager.getExtensionInfo(id) || {}
    return { store: info || null, error: !info ? 'extension not loaded' : '' }
  })
  ipcMain.on('close-extension', (_, id: string) => {
    const { window } = extensionWindowManager.getExtensionInfo(id) || {}
    window?.close()
  })
}
