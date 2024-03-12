<script setup lang="ts">
import { reactive, ref, computed, watch, defineProps } from 'vue'
import { cloneDeep } from 'lodash-es'
import { api } from '~/api'
import { invoiceState } from '~/assets/invoice'
import { router } from "~/composables/useRouter";

const props = defineProps<{
  status?: string
}>()

const tab = reactive({
  nav: [
    { text: '未开票账单', key: '1' },
    { text: '已开票账单', key: '2' },
  ],
  active: props.status || '1',
  handler: (row: Data) => tab.active = row.key,
})

const list = ref<Data[]>([])
const checkList = computed(() => list.value.filter(v => v.check))

onShow(initDataFn)

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

watch(() => tab.active, initDataFn)

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

// 查看发票
function view (row: Data) {

}

// 下载发票
async function download (row: Data) {

  row.loading = true
  const url = 'https://xz.bwfapiao.com/914101001001001001/041001900111/041001900111_11221872.pdf?Expires=2025244919&OSSAccessKeyId=LTAIB3SkRb2V8Vu1&Signature=njif3O2vG%2Fu0bh8IKmpY53BRkME%3D'
  uni.downloadFile({
    url: url,
    success: function (res) {
      var filePath = res.tempFilePath;
      uni.openDocument({
        filePath: filePath,
        showMenu: true,
        fail: e => {
          uni.showToast({
            icon: 'none',
            title: `打开文件失败: ${e.errMsg}`
          })
        },
        complete: () => row.loading = false
      });
    },
    fail(e) {
      setTimeout(() => row.loading = false, 100)
      uni.showToast({
        icon: 'none',
        title: e.errMsg
      })
    }
  });
  // uni.openDocument({
  //   filePath: res.data.url
  // })
  // const res = await api.invoice.download(row.id)
  // console.log(res)

}

// 再次开票
async function rebillHandler (row: Data) {
  row.rebillLoading = true
  api.invoice.rebill(row.id).then(() => {
    initDataFn()
  }).finally(() => {
    row.rebillLoading = false
  })
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
<!--        <p class="p p1" @click="router.push('/pages/merchant')">-->
<!--          找不到可开票记录？点击试试用订单搜索-->
<!--        </p>-->
<!--        <p class="p p1" @click="goScan">-->
<!--          试试扫描二维码-->
<!--        </p>-->
      </div>
    </view>
    <view v-else class="flex-1 overflow-y-auto">
      <view v-for="(item, index) in list" :key="index" class="m-3 rounded bg-white p-2 relative overflow-hidden" @click="checkHandler(item)">
        <view class="mb-2 flex items-center justify-between">
          <div class="rounded bg-$main px-6px py-2px text-14px text-white">
            {{ item.car_num }}
          </div>
          <div v-if="tab.active == '1'" class="radio text-$main">
            <div v-if="!item.check" i-ic:sharp-radio-button-unchecked />
            <div v-else i-material-symbols:check-circle />
          </div>
          <div v-else class="radio text-$main">
            <div v-if="item.is_invoice == 4">
              <view class="text-$main px-3 rounded text-3 b b-solid b-$main h-6 lh-6 flex" @click="rebillHandler(item)">
                <div class="m-auto" v-if="item.rebillLoading" i-line-md:loading-twotone-loop></div>
                <span class="m-auto" v-else>重新开票</span>
              </view>
            </div>
<!--            123321-->
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
            <p class="text-right">{{ payStatus(item.pay_type) }}</p>
          </div>
        </view>
        <view v-if="tab.active == '2'" class="w-70% flex items-center justify-between text-3">
          <div class="flex items-center text-$main gap-1 py-1" @click="download(item)">
            <span>查看发票</span>
            <div v-if="item.loading" i-line-md:loading-twotone-loop></div>
            <div v-else i-material-symbols:arrow-circle-right-outline></div>
          </div>
<!--          <div class="flex items-center text-$main gap-1 py-1" @click="download(item)">-->
<!--            <span>下载发票</span>-->
<!--            <div v-if="item.loading" i-line-md:loading-twotone-loop></div>-->
<!--            <div v-else i-material-symbols:downloading-rounded></div>-->
<!--          </div>-->
        </view>
        <view v-if="tab.active == '2'" class="w-20 h-20 absolute right--4 bottom--4 transform rotate--45 op-40">
          <image v-if="item.is_invoice == 1" src="../static/p-no.png" class="w-full h-full"></image>
          <image v-else-if="item.is_invoice == 2" src="../static/p-loading.png" class="w-full h-full"></image>
          <image v-else-if="item.is_invoice == 3" src="../static/p-ok.png" class="w-full h-full"></image>
          <image v-else-if="item.is_invoice == 4" src="../static/p-fail.png" class="w-full h-full"></image>
        </view>
      </view>
    </view>

    <div v-if="checkList.length > 0 && tab.active == '1'" class="flex items-center justify-between b-t b-t-$line b-t-solid bg-white px-3 py-2">
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
