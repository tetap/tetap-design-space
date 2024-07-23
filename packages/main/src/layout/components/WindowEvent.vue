<template>
  <div class="flex h-full" style="-webkit-app-region: no-drag">
    <div
      class="aspect-square h-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer flex items-center justify-center"
      @click="windowEvent('minimize')"
    >
      <img src="@/assets/window_manager/ic_chrome_minimize.png" alt="logo" class="w-6/12 h-auto" />
    </div>
    <div
      class="aspect-square h-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer flex items-center justify-center"
      @click="windowEvent('restore')"
    >
      <img :src="isMaximized ? WindowRestore : WindowMaximize" alt="logo" class="w-6/12 h-auto" />
    </div>
    <div
      class="aspect-square h-full hover:bg-red-400 active:bg-red-500 cursor-pointer flex items-center justify-center"
      @click="windowEvent('close')"
    >
      <img src="@/assets/window_manager/ic_chrome_close.png" alt="logo" class="w-6/12 h-auto" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import WindowMaximize from '@/assets/window_manager/ic_chrome_maximize.png'
import WindowRestore from '@/assets/window_manager/ic_chrome_unmaximize.png'
const isMaximized = ref(false)

function windowEvent(event: string) {
  window.ipc.send('window-nav-event', event)
}
window.ipc.addEventListener('window-nav-restore', (_, event: boolean) => {
  console.log(event)
  isMaximized.value = event
})
</script>

<style lang="scss" scoped></style>
