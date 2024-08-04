import fsp from 'fs/promises'
import { dialog, OpenDialogOptions, SaveDialogOptions } from 'electron'
import type { ReadFileParamsType, WriteFileParamsType } from './types'

export const fs = Object.freeze({
  directoryOpen: (options: OpenDialogOptions) => dialog.showOpenDialog(options),
  fileOpen: (options: OpenDialogOptions) => dialog.showOpenDialog(options),
  fileSave: (options: SaveDialogOptions) => dialog.showSaveDialog(options),
  readFile: (path: ReadFileParamsType[0], options: ReadFileParamsType[1] = {}) =>
    fsp.readFile(path, options),
  writeFile: (
    path: WriteFileParamsType[0],
    data: WriteFileParamsType[1],
    options: WriteFileParamsType[2] = {}
  ) => fsp.writeFile(path, data, options)
})
