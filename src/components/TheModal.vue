<script lang="ts" setup>
const props = defineProps<{
  title: string
  msg: string
  visible: boolean
}>()

const emits = defineEmits(['update:visible'])

const show = ref(props.visible)
watch(show, () => emits("update:visible", show.value))
</script>

<template>
<div class="fixed left-0 top-0 w-full h-full bg-black/50 z-10">
  <div class="fixed top-50% left-50% transform translate-x--50% translate-y--50% py-5 overflow-y-auto px-4 max-h-60% bg-white rounded w-70% z-10 shadow-lg">

    <div v-if="title" class="mb-3 text-5 text-center">{{title}}</div>
    <div class="content">
      {{msg}}
    </div>

    <button type="primary" class="mt-5" @click="show = false">确定</button>
  </div>
</div>
</template>

<style lang="scss" scoped>
.content{white-space: break-spaces;}
</style>
