<template>
  <v-empty-state
    :image="PageNotFound"
    headline="Whoops, 404"
    title="Page not found"
    text="The page you were looking for does not exist"
    action-text="Back to Home"
    @click:action="onClickAction"
  ></v-empty-state>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import PageNotFound from '@/assets/404-page-not-found.svg'

const router = useRouter()

const onClickAction = () => router.push('/')
</script>

<style lang="scss" scoped></style>
