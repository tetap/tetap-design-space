<template>
  <div class="main-container">
    <div
      v-for="store in AppStoreConfig"
      :key="store.id"
      class="flex items-center relative rounded-md overflow-hidden bg-white p-4 shadow-md duration-150 origin-center"
      :class="[
        store.loading
          ? 'cursor-wait'
          : 'hover:scale-105 hover:shadow-lg hover:!bg-indigo-100  cursor-pointer'
      ]"
      v-ripple="{ class: 'text-primary' }"
      @click="handleJumpExtension(store)"
    >
      <img :src="store.icon" alt="" class="w-20 h-20 flex-none" />
      <div class="ml-2 flex-1">
        <h2 class="text-base font-bold truncate">{{ store.title }}</h2>
        <p class="text-xs mt-1 line-clamp-3">{{ store.description }}</p>
      </div>
      <div
        v-if="store.loading"
        v-ripple.stop
        class="absolute right-0 top-0 w-full h-full flex items-center justify-center p-2 bg-indigo-100/50 text-primary"
      >
        <v-progress-linear indeterminate></v-progress-linear>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppStoreConfig } from '@/config'
import { useNotify } from '@/hooks'

const { show } = useNotify()

function handleJumpExtension(store: (typeof AppStoreConfig)[0]) {
  if (store.loading) return
  const isDev = import.meta.env.DEV
  const src = isDev ? store.devSrc : store.src
  store.loading = true
  show('test', { color: 'red', timeout: 1000 }).finally(() => {
    // await window.ipc.invoke('run-extension').catch((error) => {})
    store.loading = false
  })
}
</script>

<style lang="scss" scoped>
.main-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 24px;
}
</style>
