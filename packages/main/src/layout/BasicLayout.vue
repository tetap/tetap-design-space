<template>
  <div class="w-dvw h-dvh flex flex-col">
    <div
      class="flex-none bg-gray-100 h-8 flex items-center justify-between"
      style="-webkit-app-region: drag"
    >
      <img :src="SiteConfig.logo" alt="" class="h-5 w-auto ml-2" />
      <WindowEvent />
    </div>
    <div class="flex-1 min-w-0 min-h-0 flex flex-row">
      <div class="flex-none px-2" style="-webkit-app-region: drag"></div>
      <div class="overflow-y-auto p-6 flex-1 min-w-0 bg-gray-50">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import WindowEvent from './components/WindowEvent.vue'
import { SiteConfig } from '@/config'

const route = useRoute()

route
</script>

<style lang="scss" scoped></style>
