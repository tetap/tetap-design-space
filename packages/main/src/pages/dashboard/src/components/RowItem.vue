<template>
  <div
    class="w-full flex items-center relative rounded-md overflow-hidden bg-white p-4 duration-150 origin-center border border-solid border-gray-100"
    :class="[
      store.loading
        ? 'cursor-wait'
        : 'hover:shadow-lg hover:bg-primary-100  cursor-pointer hover:border-primary-100'
    ]"
    @click="handleJumpExtension(store)"
  >
    <img :src="store.icon" alt="" class="w-6 h-6 flex-none" />
    <div class="ml-2 flex-1">
      <h2 class="text-sm truncate">{{ store.title }}</h2>
    </div>
    <div
      v-if="store.loading"
      class="absolute right-0 top-0 w-full h-full flex items-center justify-center p-2 bg-primary-100/50 text-primary"
    >
      <Spin class="text-primary animate-spin" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRaw } from 'vue'
import { Spin } from '@/icons'
import type { AppStoreConfig } from '@/config'

defineProps<{ store: (typeof AppStoreConfig)[0] }>()

function handleJumpExtension(store: (typeof AppStoreConfig)[0]) {
  if (store.loading) return
  store.loading = true
  console.log(Object.assign(toRaw(store), { src: store.dev }))
  window.ipc
    .invoke('open-extension', Object.assign(toRaw(store), { src: store.dev }))
    .finally(() => {
      store.loading = false
    })
}
</script>
