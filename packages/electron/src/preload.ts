/*
 *@description: 注入web使用
 *@author: zyc
 *@date-time: 2023-07-31 10:26:22
 */
import { contextBridge, ipcRenderer } from 'electron'
import './logger/renderer'

contextBridge.exposeInMainWorld('ipc', {
  send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
  invoke: (channel: string, ...args: any[]): Promise<any> => ipcRenderer.invoke(channel, ...args),
  addEventListener: (
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...args: any) => void
  ) => {
    ipcRenderer.addListener(channel, listener)
  },
  removeEventListener: (
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...args: any) => void
  ) => {
    ipcRenderer.removeListener(channel, listener)
  },
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  }
})

contextBridge.exposeInMainWorld('TetapConfig', {
  serviceUri: 'http://localhost:39090'
})
