/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 扩展window对象
interface Window {
  /**
   * Electron ipcRenderer
   * 后面会将进程通讯方法挂载到window对象上,所以添加此接口防止报错
   */
  ipc: {
    // Docs: https://electronjs.org/docs/api/ipc-renderer

    invoke(channel: string, ...args: any[]): Promise<any>

    addEventListener(channel: string, listener: (event: any, ...args: any[]) => void): this

    removeAllListeners(channel: string): this

    removeListener(channel: string, listener: (...args: any[]) => void): this

    send(channel: string, ...args: any[]): void
  }

  logger: {
    error: (message?: any, ...optionalParams: any[]) => void
    info: (message?: any, ...optionalParams: any[]) => void
    log: (message?: any, ...optionalParams: any[]) => void
    warn: (message?: any, ...optionalParams: any[]) => void
  }
}
