<script setup lang="ts">
const props = defineProps<{ name: string }>()
</script>

<template>
  <div>
    <div i-carbon-pedestrian inline-block text-4xl />
    <p my-1>
      Hi, {{ name }}!
    </p>
    <p text-sm italic op75>
      <em>Demo of dynamic route</em>
    </p>

    <div m="t-8 b-5">
      <TheCounter />
    </div>

    <div>
      <button btn m-3 text-sm @click="router.back()">
        Back
      </button>
    </div>
  </div>
</template>
