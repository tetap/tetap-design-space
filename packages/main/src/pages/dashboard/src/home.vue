<template>
  <div>
    <div class="text-lg mb-3">{{ $t('home.title') }}</div>
    <div
      class="grid gap-2 grid-cols-1 2xl:grid-cols-7 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2"
    >
      <RowItem v-for="store in AppStoreConfig" :key="store.name" :store="store" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppStoreConfig } from '@/config'
import RowItem from './components/RowItem.vue'
</script>
