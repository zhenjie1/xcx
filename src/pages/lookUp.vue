<script setup lang="ts">
import { api } from '~/api'
import { invoiceState } from '~/assets/invoice'
import { cloneDeep } from "lodash-es";

const props = defineProps<{
  type: string
}>()

const list = ref<Data[]>([])

onShow(() => {
  api.lookUp.list().then(res => list.value = res.data)
})

function goLookUpAdd() {
  router.push('/pages/lookUpAdd')
}

function handler(item: Data) {
  if (props.type === 'check') {
    invoiceState.title_data = cloneDeep(item)
    router.push(`/pages/invoiceConfirm`)
  }
  else
    router.push(`/pages/lookUpAdd?id=${item.id}`)
}
</script>

<template>
  <view class="min-h-full bg-#f5f5f5 px-3 pt-1px">
    <view class="">
      <view v-for="(item, index) in list" :key="index" class="relative mt-3 rounded bg-white p-3 b b-solid b-#f5f5f5" @click="handler(item)">
        <view>{{ item.name }}</view>
        <view v-if="item.type === 1" class="mt-1 text-3 opacity-50">
          税号：{{ item.tax_number }}
        </view>
        <view v-if="type === 'check'" i-ic:baseline-arrow-forward-ios class="absolute right-3 top-50% translate-y--50% transform op30" />
      </view>
    </view>

    <view class="mt-4 rounded bg-white py-6 text-center b b-solid b-#f5f5f5" @click="goLookUpAdd">
      <div class="mx-auto mb-2 h-10 w-10 flex border border-black rounded-full border-dashed opacity-50">
        <div i-tabler:plus class="m-auto" />
      </div>
      <p class="opacity-50">
        添加发票抬头
      </p>
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
