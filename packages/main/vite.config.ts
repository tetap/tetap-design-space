import { defineConfig } from 'vite'
import { URL, fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import SvgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), jsx(), SvgLoader(), AutoImport()],
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
    chunkSizeWarningLimit: 2048,
    sourcemap: false
  },
  resolve: {
    dedupe: ['vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``
      }
    }
  }
})
