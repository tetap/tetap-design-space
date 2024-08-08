import { BrowserWindow, Rectangle, screen } from 'electron'
import { join, resolve } from 'path'
import windowStateKeeper from 'electron-window-state'
import { configureWindow } from '../utils/configureWindow'
import { MenuBuilder } from '../utils/menu'
import { mainIpc } from '../ipc'
/**
 * packages.json,script中通过cross-env NODE_ENV=production设置的环境变量
 * 'production'|'development'
 */
const NODE_ENV = process.env.NODE_ENV === 'development'

/** 创建窗口方法 */
async function createWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 600
  })

  // 生成窗口实例
  const Window = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 1024,
    minHeight: 600,
    fullscreenable: false, //禁止F11全屏
    frame: false, // * app边框(包括关闭,全屏,最小化按钮的导航栏) @false: 隐藏
    transparent: false, // * app 背景透明
    hasShadow: false, // * app 边框阴影
    show: false, // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
    resizable: true, // 禁止手动修改窗口尺寸
    webPreferences: {
      preload: join(__dirname, '..', 'preload'), // 加载脚本
      // backgroundThrottling: false,
      nodeIntegration: true, // 渲染层可以使用node
      contextIsolation: true, //允许渲染进程使用nodejs
      webSecurity: false // 跨域
    }
  })
  Window.webContents.session.setPermissionCheckHandler(() => true)
  Window.webContents.session.setPermissionRequestHandler(() => true)
  mainWindowState.manage(Window)
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  // 屏幕小于预设时直接全屏显示
  if (mainWindowState.width <= width || mainWindowState.height <= height) {
    Window.maximize()
    const bounds: Partial<Rectangle> = {
      height,
      width
    }
    Window.setBounds(bounds)
  }
  // 开发环境 打开开发者工具
  const uri = NODE_ENV ? `http://localhost:18181` : `file://${resolve(__dirname, '..')}/index.html`
  Window.loadURL(uri)
  // 开启IPC事件通信
  mainIpc(Window)
  // 窗口默认事件拦截
  configureWindow(Window)

  // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
  Window.once('ready-to-show', () => {
    // 菜单
    const menuBuilder = new MenuBuilder(Window)
    menuBuilder.buildMenu()
    Window.show() // 显示窗口
  })
  return Window
}

export { createWindow }
