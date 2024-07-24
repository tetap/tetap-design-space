<template>
  <v-empty-state
    headline="Whoops, 404"
    title="Page not found"
    text="The page you were looking for does not exist"
    action-text="Back to Home"
  >
    <template v-slot:actions>
      <v-btn text="Back to Home" color="indigo-darken-3" @click="onClickAction"></v-btn>
    </template>
  </v-empty-state>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const onClickAction = () => router.push('/')
</script>

<style lang="scss" scoped></style>
