import { defineConfig } from 'vite'
import { URL, fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
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
