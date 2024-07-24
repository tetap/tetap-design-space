<template>
  <div class="main-container">
    <div
      v-for="store in SiteConfig.stores"
      :key="store.id"
      class="flex items-center rounded-md bg-white p-4 shadow-md cursor-pointer duration-150 origin-center hover:scale-105 hover:shadow-lg hover:!bg-indigo-100"
      v-ripple="{ class: 'text-primary' }"
    >
      <img :src="store.icon" alt="" class="w-20 h-20 mr-2" />
      <div class="">
        <h2>{{ store.title }}</h2>
        <p>{{ store.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SiteConfig } from '@/config'
</script>

<style lang="scss" scoped>
.main-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 24px;
}
</style>
