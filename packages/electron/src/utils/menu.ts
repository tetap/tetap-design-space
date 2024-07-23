import { Menu, BrowserWindow } from 'electron'

export class MenuBuilder {
  mainWindow: BrowserWindow

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
  }

  buildMenu() {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      this.setupDevelopmentEnvironment()
    } else {
      if (process.platform === 'darwin') {
        const template = [
          {
            label: 'Edit',
            submenu: [
              { role: 'undo' },
              { role: 'redo' },
              { type: 'separator' },
              { role: 'cut' },
              { role: 'paste' },
              { role: 'pasteandmatchstyle' },
              { role: 'delete' },
              { role: 'selectall' },
              { label: 'copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' }
            ]
          }
        ]
        Menu.setApplicationMenu(Menu.buildFromTemplate(template as any))
      } else {
        Menu.setApplicationMenu(Menu.buildFromTemplate([]))
      }
    }
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y)
          }
        }
      ]).popup({ window: this.mainWindow })
    })
  }
}
