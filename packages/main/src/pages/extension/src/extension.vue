<template>
  <ExtensionLayout
    :logo="state.store?.icon"
    :title="state.store?.title"
    :maximized="state.store?.windowOptions?.resizable"
  >
    <div
      v-if="state.loading"
      class="fixed-top w-full h-full z-10 bg-gray-100 flex items-center justify-center"
    >
      <Spin class="text-3xl text-primary animate-spin" />
    </div>
    <main
      v-if="state.error"
      class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div class="text-center">
        <h1 class="mt-4 text-2xl font-bold tracking-tight text-red-500">Extension Load Error</h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          {{ state.error }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            @click="handleClose"
            class="rounded-md cursor-pointer bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Close
          </a>
        </div>
      </div>
    </main>
    <webview v-if="state.store" class="w-full h-full inline-flex" :src="state.store?.dev" />
  </ExtensionLayout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { Spin } from '@/icons'
import ExtensionLayout from '@/layout/ExtensionLayout.vue'
import type { AppStoreConfig } from '@/config'

const route = useRoute()

const state = reactive({
  loading: true,
  error: '',
  store: null as null | (typeof AppStoreConfig)[0]
})

getStoreInfo()

function getStoreInfo() {
  state.error = ''
  state.loading = true
  window.ipc
    .invoke('get-extension-info', route.params.name)
    .then(({ store, error }) => {
      state.error = error
      state.store = store
      document.title = store?.title || 'Tetap Extension'
    })
    .catch((error) => {
      state.error = error
    })
    .finally(() => {
      state.loading = false
    })
}

function handleClose() {
  window.ipc.send('close-extension', route.params.name)
}
</script>

<style lang="scss" scoped></style>
