import { defineConfig } from 'vite'
import { URL, fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import SvgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['webview'].includes(tag)
        }
      }
    }),
    jsx(),
    SvgLoader()
  ],
  server: {
    port: 18181,
    strictPort: true,
    fs: {
      strict: false,
      allow: []
    }
  },
  esbuild: {
    treeShaking: true
  },
  build: {
    outDir: '../electron/release/app',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2048,
    sourcemap: false
  },
  resolve: {
    dedupe: ['vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
