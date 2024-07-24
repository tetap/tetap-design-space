<template>
  <v-app :theme="theme">
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const theme = ref('light')
</script>

<style lang="scss" scoped></style>
