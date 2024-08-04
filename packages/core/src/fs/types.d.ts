import type { FileFilter } from 'electron'
import type fsp from 'fs/promises'

export type FileOpenOptionsType = {
  filters?: FileFilter[]
  multiple?: boolean
  defaultPath?: string
}

export type ReadFileParamsType = Parameters<typeof fsp.readFile>

export type WriteFileParamsType = Parameters<typeof fsp.writeFile>
