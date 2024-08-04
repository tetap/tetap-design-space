<template>
  <div class="w-dvw h-dvh flex flex-col bg-gray-100" style="-webkit-app-region: drag">
    <div class="flex-none h-8 flex items-center justify-between position-relative z-[2147483647]">
      <div class="flex justify-between gap-2 items-center">
        <img v-if="logo" :src="logo" alt="" class="h-5 w-auto ml-2" />
        <div class="font-bold text-xs">{{ title }}</div>
      </div>
      <WindowEvent :maximized="maximized" />
    </div>
    <div class="flex-1 min-w-0 bg-gray-50 overflow-hidden" style="-webkit-app-region: no-drag">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import WindowEvent from './components/WindowEvent.vue'

withDefaults(
  defineProps<{
    logo?: string
    title?: string
    maximized?: boolean
  }>(),
  {
    logo: '',
    title: '',
    maximized: true
  }
)
</script>
