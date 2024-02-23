<script setup>
function alert() {
  router.push('/pages/whatMerchant')
}
</script>

<template>
  <div class="pt-1px">
    <input type="text" placeholder="请输入商户订单号" class="my-3 h-13 bg-white px-3">
    <div class="mx-3 mt-3 flex items-center text-14px text-blue" @click="alert">
      <div i-bi:question-circle-fill class="mr1" />
      <span>什么是商户订单号？</span>
    </div>
    <button type="primary" class="mx-3 mb-10 mt-10">
      确认
    </button>
  </div>
</template>
