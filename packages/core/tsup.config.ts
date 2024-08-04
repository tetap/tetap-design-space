import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  globalName: 'TetapCore',
  clean: true,
  dts: true,
  external: ['electron'],
  minify: true
})
