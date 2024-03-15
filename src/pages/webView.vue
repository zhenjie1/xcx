<script setup lang="ts">
const { url } = defineProps<{ url: string }>()
</script>

<template>
  <web-view :src="url" class="h-100vh w-100vw" />
</template>
