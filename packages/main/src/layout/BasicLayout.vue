<template>
  <div class="w-dvw h-dvh flex flex-col">
    <div
      class="flex-none bg-gray-100 h-8 flex items-center justify-between"
      style="-webkit-app-region: drag"
    >
      <img src="@/assets/logo.webp" alt="" class="h-5 w-auto ml-2" />
      <WindowEvent />
    </div>
    <div class="flex-1 min-w-0 min-h-0 flex flex-row">
      <div class="flex-none">
        <v-list density="compact" width="220px">
          <v-list-item title="Inbox" value="inbox" color="primary"></v-list-item>
          <v-list-item title="Supervisors" value="supervisors" color="primary"></v-list-item>
          <v-list-item title="Clock-in" value="clockin" color="primary"></v-list-item>
        </v-list>
      </div>
      <div class="overflow-y-auto flex-1 min-w-0">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WindowEvent from './components/WindowEvent.vue'
</script>

<style lang="scss" scoped></style>
