<template>
  <div>404</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const onClickAction = () => router.push('/')
</script>

<style lang="scss" scoped></style>
