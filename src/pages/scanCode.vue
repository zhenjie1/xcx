<script lang="ts" setup>
uni.scanCode({
  success() {},
  fail() {
    uni.showToast({
      icon: 'none',
      title: '扫描失败',
    })
    uni.navigateBack()
  },
})
</script>

<template>
  <div class="bg-red">
    scan
  </div>
</template>
