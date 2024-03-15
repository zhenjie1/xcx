<script setup>
import { api } from '~/api'

function getDate(type) {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (type === 'start')
    year = year - 60
  else if (type === 'end')
    year = year + 2

  month = month > 9 ? month : `0${month}`
  day = day > 9 ? day : `0${day}`
  return `${year}-${month}-${day}`
}

const form = reactive({
  order_no: '',
  car_num: '',
})

function change(e) {
  form.date = e.detail.value
}

const show = ref(false)
const msg = `一，银联凭证号：打开“云闪付”App后点击“我的”，点击“我的账单”，选择需要开票的交易，进入详情，可找到商户订单号，扫描加载
二，车牌号：车牌号为两部分，车牌颜色+车牌号。 例：蓝豫A123456`
function alert() {
  show.value = true
//   uni.showModal({
//     title: '温馨提示',
//     content: `一，银联凭证号：打开“云闪付”App后点击“我的”，点击“我的账单”，选择需要开票的交易，进入详情，可找到商户订单号，扫描加载
// 二，车牌号：车牌号为两部分，车牌颜色+车牌号。 例：蓝豫A123456`,
//     showCancel: false,
//   })
}

function scanHandler() {
  uni.scanCode({
    success(e) {
      if (e?.result) {
        form.order_no = e.result
      }
    },
    fail() {
      uni.showToast({
        icon: 'none',
        title: '扫描失败',
      })
    },
  })
}

async function submit() {
  let message = ''
  if (!form.order_no) message = '请输入银联消费凭证号'
  else if (!form.car_num) message = '请输入车牌号'

  if (message) return uni.showToast({
    title: message,
    icon: 'none',
  })

  await api.unionPay.add(form)

  uni.reLaunch({
    url: `/pages/invoiceList?type=unionPay&row=${encodeURIComponent(JSON.stringify(form))}`,
  })
}
</script>

<template>
  <div class="min-h-100vh bg-#f5f5f5">
    <div class="bg-white">
      <div class="relative">
        <input v-model="form.order_no" type="text" class="item h-13 w-[calc(100vw-48rpx)] px-3" placeholder="请输入银联消费凭证号">
        <div class="absolute right-0 top-0 z-10 bg-white p-4 text-5 text-$main" @click="scanHandler">
          <div i-tabler:text-scan-2 />
        </div>
      </div>
      <!--      <div class="item flex justify-between px-3"> -->
      <!--        <picker mode="date" class="flex flex-1" :value="form.date" :start="startDate" :end="endDate" @change="change"> -->
      <!--          <div class="w-[calc(100vw-48rpx)] flex items-center justify-between"> -->
      <!--            <span class="lh-13">{{ form.date }}</span> -->
      <!--            <div class="flex items-center"> -->
      <!--              <div i-material-symbols:arrow-forward-ios class="arrow opacity-20" /> -->
      <!--            </div> -->
      <!--          </div> -->
      <!--        </Picker> -->
      <!--      </div> -->
      <input v-model="form.car_num" type="text" class="item h-13 w-[calc(100vw-48rpx)] px-3" placeholder="示例：蓝豫A12345(车牌颜色+车牌号)">
    </div>

    <div class="mx-3 mt-3 flex items-center text-14px text-blue" @click="alert">
      <div i-bi:question-circle-fill class="mr1" />
      <span>什么是银联凭证号和车牌号</span>
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
