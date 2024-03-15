<script setup>
import { api } from '~/api'

const form = reactive({
  car_num: '',
})

async function submit() {
  let message = ''
  if (!form.car_num) message = '请输入车牌号'

  if (message) return uni.showToast({
    title: message,
    icon: 'none',
  })

  // const formData = new FormData()
  // formData.append('car_num', form.car_num)
  await api.invoice.cashList(form.car_num)

  uni.reLaunch({
    url: `/pages/invoiceList?type=cash&row=${encodeURIComponent(JSON.stringify(form))}`,
  })
}
</script>

<template>
  <div class="min-h-100vh bg-#f5f5f5">
    <div class="bg-white">
      <input v-model="form.car_num" type="text" class="item h-13 w-[calc(100vw-48rpx)] px-3" placeholder="示例：蓝豫A12345(车牌颜色+车牌号)">
    </div>

    <button type="primary" class="mx-3 mb-10 mt-10" @click="submit">
      查询
    </button>
  </div>
  <TheModal v-if="show" v-model:visible="show" title="提示" :msg="msg" />
</template>

<style lang="scss" scoped>
.item{border-top: 1px solid #f5f5f5;}
</style>
