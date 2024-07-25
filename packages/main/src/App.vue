<template>
  <v-app :theme="theme">
    <OverlaysProvider>
      <router-view />
    </OverlaysProvider>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { OverlaysProvider } from '@overlastic/vue'

const theme = ref('light')
</script>

<style lang="scss" scoped></style>
