<script setup lang="ts">
import { computed, defineProps, reactive, ref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { api } from '~/api'
import { invoiceState } from '~/assets/invoice'
import { router } from '~/composables/useRouter'
import { awaitWrap, tryParse } from '~/assets/tools'

const props = defineProps<{
  status?: string

  type?: 'unionPay' | 'cash'
  row?: string
}>()

if (props.type) {
  uni.setNavigationBarTitle({
    title: props.type === 'cash' ? '现金开票' : '银联开票',
  })
}

const propsRow = computed(() => props.row ? (tryParse(decodeURIComponent(props.row)) || {}) : {})

const tab = reactive({
  nav: [
    { text: '未开票账单', key: '1' },
    { text: '已开票账单', key: '2' },
  ],
  active: props.status || '1',
  handler: (row: Data) => tab.active = row.key,
})

const page = reactive({
  current: 1,
  size: 10,
  // 一共多少页数据
  lastPage: 2,
})
const list = ref<Data[]>([])
const checkList = computed(() => list.value.filter(v => v.check))

onShow(() => {
  page.current = 1
  page.lastPage = 2
  initDataFn()

  invoiceState.invoiceType = props.type || ''
})
onPullDownRefresh(() => {
  page.current = 1
  page.lastPage = 2
  initDataFn()
})

onReachBottom(() => {
  initDataFn()
})

async function initDataFn() {
  if (page.current >= page.lastPage) {
    uni.stopPullDownRefresh()
    return console.log('到底了')
  }
  list.value = []

  let apiFetch = api.invoice.list(tab.active, page.current, page.size)
  if (props.type) {
    if (props.type === 'cash') apiFetch = api.invoice.cashList(propsRow.value?.car_num)
    else if (props.type === 'unionPay') apiFetch = api.invoice.unionPayList(propsRow.value || {})
  }
  const [err, res] = await awaitWrap(apiFetch)
  uni.stopPullDownRefresh()

  if (err) return

  list.value = res!.data?.data || []
  page.current = res!.data.current_page
  page.lastPage = res!.data.last_page
}

function payStatus(k: string) {
  const data: Data = {
    1: '支付宝',
    2: '微信',
    3: '银联',
  }
  return data[k]
}

watch(() => tab.active, () => {
  page.current = 1
  page.lastPage = 2
  initDataFn()
})

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
function view(row: Data) {

}

// 下载发票
async function download(row: Data) {
  row.loading = true
  const [err, res] = await awaitWrap(api.invoice.download(row.id))
  if (err) return row.loading = false

  uni.downloadFile({
    url: res.data.url,
    success(res) {
      const filePath = res.tempFilePath
      uni.openDocument({
        filePath,
        showMenu: true,
        fail: (e) => {
          uni.showToast({
            icon: 'none',
            title: `打开文件失败: ${e.errMsg}`,
          })
        },
        complete: () => row.loading = false,
      })
    },
    fail(e) {
      setTimeout(() => row.loading = false, 100)
      uni.showToast({
        icon: 'none',
        title: e.errMsg,
      })
    },
  })
  // uni.openDocument({
  //   filePath: res.data.url
  // })
  // const res = await api.invoice.download(row.id)
  // console.log(res)
}

// 再次开票
async function rebillHandler(row: Data) {
  // row.rebillLoading = true

  invoiceState.invoices = cloneDeep([row])
  invoiceState.invoiceType = 'new'
  router.push('/pages/lookUp?type=check')

  // api.invoice.rebill(row.id).then(() => {
  //   initDataFn()
  // }).finally(() => {
  //   row.rebillLoading = false
  // })
}
</script>

<template>
  <view class="h-full flex flex-col container">
    <view v-if="!type" class="topFixed">
      <view v-for="(item, i) in tab.nav" :key="item.key" class="item" :class="{ active: item.key === tab.active, [`item-${i}`]: true }" @click="tab.handler(item)">
        {{ item.text }}
      </view>
    </view>

    <view v-if="list.length === 0" class="emitContainer flex-1 overflow-y-auto bg-#f5f5f5">
      <div class="box">
        <image src="../../static/empty.svg" style="width: 500rpx;height: 500rpx;margin:auto;display: block;margin-bottom: -40rpx;" mode="" />
        <p class="p p1">
          暂无数据
        </p>
        <!--        <p class="p p1" @click="router.push('/pages/merchant')"> -->
        <!--          找不到可开票记录？点击试试用订单搜索 -->
        <!--        </p> -->
        <!--        <p class="p p1" @click="goScan"> -->
        <!--          试试扫描二维码 -->
        <!--        </p> -->
      </div>
    </view>
    <view v-else class="flex-1 overflow-y-auto bg-#f5f5f5" :class="[!type && 'pt-10']">
      <view v-for="(item, index) in list" :key="index" class="relative m-3 overflow-hidden rounded bg-white p-2" @click="checkHandler(item)">
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
              <view class="h-6 flex b b-$main rounded b-solid px-3 text-3 text-$main lh-6" @click="rebillHandler(item)">
                <div v-if="item.rebillLoading" class="m-auto" i-line-md:loading-twotone-loop />
                <span v-else class="m-auto">重新开票</span>
              </view>
            </div>
            <!--            123321 -->
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
            <p class="text-right">
              {{ payStatus(item.pay_type) }}
            </p>
          </div>
        </view>
        <view v-if="tab.active == '2' && item.is_invoice != 2" class="w-70% flex items-center justify-between text-3">
          <div class="flex items-center gap-1 py-1 text-$main" @click="download(item)">
            <span>查看发票</span>
            <div v-if="item.loading" i-line-md:loading-twotone-loop />
            <div v-else i-material-symbols:arrow-circle-right-outline />
          </div>
          <!--          <div class="flex items-center text-$main gap-1 py-1" @click="download(item)"> -->
          <!--            <span>下载发票</span> -->
          <!--            <div v-if="item.loading" i-line-md:loading-twotone-loop></div> -->
          <!--            <div v-else i-material-symbols:downloading-rounded></div> -->
          <!--          </div> -->
        </view>
        <view v-if="tab.active == '2'" class="absolute bottom--4 right--4 h-20 w-20 rotate--45 transform op-40">
          <image v-if="item.is_invoice == 1" src="../static/p-no.png" class="h-full w-full" />
          <image v-else-if="item.is_invoice == 2" src="../static/p-loading.png" class="h-full w-full" />
          <image v-else-if="item.is_invoice == 3" src="../static/p-ok.png" class="h-full w-full" />
          <image v-else-if="item.is_invoice == 4" src="../static/p-fail.png" class="h-full w-full" />
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
.topFixed{display: flex;background-color: white;position: fixed;top: 0;left: 0;width: 100%;z-index: 10;border-bottom: 1px solid #e6e6e6;
  .item{flex: 1;text-align: center;line-height: 40rpx;padding: 20rpx 0;color: #999;}
  .item-1{position: relative;
    &:before{content: '';display: block;border-left: 1px solid #e6e6e6;width: 1rpx;height: 50%;position: absolute;left:0;top:50%;transform: translateY(-50%);}
  }
  .item.active{color: var(--main);}
}
.radio{
}
</style>
