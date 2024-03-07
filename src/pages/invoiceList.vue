<script setup lang="ts">
import { reactive, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { api } from '~/api'
import { invoiceState } from '~/assets/invoice'

const tab = reactive({
  nav: [
    { text: '未开票账单', key: '1' },
    { text: '已开票账单', key: '2' },
  ],
  active: '1',
  handler: (row: Data) => tab.active = row.key,
})

const list = ref<Data[]>([])
const checkList = computed(() => list.value.filter(v => v.check))

async function initDataFn() {
  list.value = []
  const res = await api.invoice.list(tab.active)
  list.value = res.data?.data || []
}

function payStatus(k: string) {
  const data: Data = {
    1: '支付宝',
    2: '微信',
    3: '银联',
  }
  return data[k]
}

watch(() => tab.active, initDataFn, { immediate: true })

function goScan() {
  router.push('/pages/scanCode')
}

function checkHandler(row: Data) {
  if (!row.check) {
    if (checkList.value.length >= 5) {
      uni.showToast({
        title: '最多只能选5个',
        icon: 'none',
      })
      return
    }
  }
  row.check = !row.check
}

function nextHandler() {
  invoiceState.invoices = cloneDeep(checkList.value)
  router.push('/pages/lookUp?type=check')
}
</script>

<template>
  <view class="flex flex-col container">
    <view class="topFixed">
      <view v-for="(item, i) in tab.nav" :key="item.key" class="item" :class="{ active: item.key === tab.active, [`item-${i}`]: true }" @click="tab.handler(item)">
        {{ item.text }}
      </view>
    </view>

    <view v-if="list.length === 0" class="emitContainer flex-1 overflow-y-auto">
      <div class="box">
        <image src="../../static/empty.svg" style="width: 500rpx;height: 500rpx;margin:auto;display: block;margin-bottom: -40rpx;" mode="" />
        <p class="p p1" @click="router.push('/pages/merchant')">
          找不到可开票记录？点击试试用订单搜索
        </p>
        <p class="p p1" @click="goScan">
          试试扫描二维码
        </p>
        <p class="p p1">
          试试输入序列号
        </p>
      </div>
    </view>
    <view v-else class="flex-1 overflow-y-auto">
      <view v-for="(item, index) in list" :key="index" class="m-3 rounded bg-white p-2" @click="checkHandler(item)">
        <view class="mb-2 flex items-center justify-between">
          <div class="rounded bg-$main px-6px py-2px text-14px text-white">
            {{ item.car_num }}
          </div>
          <div class="radio text-$main">
            <div v-if="!item.check" i-ic:sharp-radio-button-unchecked />
            <div v-else i-material-symbols:check-circle />
          </div>
        </view>
        <view class="flex justify-between b-t b-t-$line b-t-solid pt-2">
          <view>
            <p>{{ item.station_name }}</p>
            <p class="text-14px op50">
              {{ item.createtime }}
            </p>
          </view>
          <div class="text-$main">
            <p>
              {{ item.money }}元
            </p>
            <p>{{ payStatus(item.pay_type) }}</p>
          </div>
        </view>
      </view>
    </view>

    <div v-if="checkList.length > 0" class="flex items-center justify-between b-t b-t-$line b-t-solid bg-white px-3 py-2">
      <p class="text-3 op50">
        每条记录将单独开具一张发票，<br>选择多条记录时不可合并开票
      </p>
      <div class="w-30 rounded bg-$main py-2 text-center text-white" @click="nextHandler">
        下一步
      </div>
    </div>
  </view>
</template>

<style lang="scss" scoped>
.container{
  background-color: rgba(0,0,0,.03);
  height: 100vh;

  .emitContainer{height: 90vh;display: flex;
    .box{margin: auto;}
    .p{color: var(--main);margin-bottom: 40rpx;text-align: center;font-size: 24rpx;}
  }
}
.topFixed{display: flex;background-color: white;
  .item{flex: 1;text-align: center;line-height: 40rpx;padding: 20rpx 0;color: #999;}
  .item-1{position: relative;
    &:before{content: '';display: block;border-left: 1px solid #e6e6e6;width: 1rpx;height: 50%;position: absolute;left:0;top:50%;transform: translateY(-50%);}
  }
  .item.active{color: var(--main);}
}
.radio{
}
</style>
