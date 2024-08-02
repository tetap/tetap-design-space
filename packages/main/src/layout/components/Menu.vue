<template>
  <div class="w-full px-2">
    <div
      v-for="item in SiteConfig.sider"
      :key="item.key"
      class="cursor-pointer flex items-center gap-2 py-2 px-4 rounded-md bg-transparent hover:bg-primary-100 active:bg-primary-300 mb-1 duration-150"
      :class="{ 'active !bg-primary-200 text-while': route.path === item.key }"
      @click="handleClick(item)"
    >
      <div v-if="item.icon" class="flex-none text-base">
        <Component :is="item.icon" />
      </div>
      <div class="flex-1 text-sm text-ellipsis overflow-hidden whitespace-nowrap min-w-0">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { SiteConfig } from '@/config'

const route = useRoute()
const router = useRouter()

const handleClick = (e: (typeof SiteConfig.sider)[0]) => {
  router.push(e.key)
}
</script>
