<script lang="ts" setup>
const list = ref([
  { title: '移动支付开票', type: 'mobile' },
  { title: '现金支付开票', type: 'cash' },
])

function goDetail(row: Data) {
  console.log('go')
  router.push(`/pages/issue/detail?type=${row.type}`)
}
</script>

<template>
  <div class="containerBox h-full pt-1px">
    <ul class="m-3 bg-white">
      <li v-for="item in list" :key="item.type" class="item mx-4 flex justify-between py-4" @click="goDetail(item)">
        <span>{{ item.title }}</span>
        <div i-material-symbols:arrow-forward-ios class="opacity-20" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.containerBox {
    .item + .item{border-top: 1px solid #f5f5f5;}
}
</style>
