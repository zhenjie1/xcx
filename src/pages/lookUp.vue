<script setup lang="ts">
const list = ref([
  {type: 'personal', name: '没地方'},
  {type: 'company', name: '公司', value: '啊手动阀'},
])

function goLookUpAdd() {
  router.push('/pages/lookUpAdd')
}
</script>

<template>
<view class="h-100vh bg-#f8f8f8 pt-1px px-3">
  <view class="">
    <view v-for="(item, index) in list" :key="index" class="bg-white p-3 mt-3 rounded shadow">
      <view>{{ item.name }}</view>
      <view v-if="item.type === 'company'" class="opacity-50 text-3 mt-1">税号：{{ item.value }}</view>
    </view>
  </view>

  <view class="text-center shadow mt-4 bg-white py-6 rounded" @click="goLookUpAdd">
    <div class="border border-dashed border-black w-10 h-10 flex rounded-full opacity-50 mx-auto mb-2">
      <div i-tabler:plus class="m-auto"></div>
    </div>
    <p class="opacity-50">添加发票抬头</p>
  </view>
</view>
</template>

<style scoped lang="scss">

</style>
