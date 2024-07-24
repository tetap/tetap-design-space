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
      <div class="flex-none px-2" style="-webkit-app-region: drag">
        <v-list width="220px">
          <template v-for="(group, index) in SiteConfig.sider" :key="index">
            <v-divider class="border-opacity-100 mt-3 mb-3" v-if="index !== 0"></v-divider>
            <v-list-item
              v-for="menu in group"
              :key="menu.path"
              :to="menu.path"
              :link="true"
              :title="menu.title"
              :prepend-icon="menu.prependIcon"
              :exact="true"
              :slim="true"
              rounded="lg"
              active-color="indigo-darken-3"
              color="primary"
              style="-webkit-app-region: no-drag"
            ></v-list-item>
          </template>
        </v-list>
      </div>
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
