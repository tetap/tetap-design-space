<template>
  <div class="w-dvw h-dvh flex flex-col bg-gray-100" style="-webkit-app-region: drag">
    <div class="flex-none h-8 flex items-center justify-between">
      <img :src="SiteConfig.logo" alt="" class="h-5 w-auto ml-2" />
      <WindowEvent />
    </div>
    <div class="flex-1 min-w-0 min-h-0 flex flex-row">
      <div class="flex-none w-60 overflow-y-auto">
        <Menu style="-webkit-app-region: no-drag" />
      </div>
      <div
        class="overflow-y-auto overflow-x-hidden p-4 flex-1 min-w-0 bg-gray-50 rounded-lg rounded-br-none rounded-bl-none mr-4"
        style="-webkit-app-region: no-drag"
      >
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WindowEvent from './components/WindowEvent.vue'
import Menu from './components/Menu.vue'
import { SiteConfig } from '@/config'
</script>
