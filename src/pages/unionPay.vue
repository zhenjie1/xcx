<script setup>
const currentDate = ref(getDate({ format: true }))
const date = ref(currentDate)

const startDate = computed(() => getDate('start'))
const endDate = computed(() => getDate('end'))

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

function change(e) {
  currentDate.value = e.detail.value
}

function alert() {
  uni.showModal({
    title: '温馨提示',
    content: `方式一: 打开“云闪付”App后点击“金融”菜单，点击已绑定的银行卡，选择“交易记录”项，点击需要开票的交易，进入详情。划动页面至底部即可找到“批次号”、“凭证号”和“参考号’。
    方式二:打开“云闪付”App后，点击“首页”菜单，点击“卡片管理”，点击已绑定的银行卡进入详情，点击“交易记录”，选择需要开票的交易，进入详情。划动页面底部即可找到“批次号”、“凭证号”和“参考号”。`,
    showCancel: false,
  })
}
</script>

<template>
  <div class="bg-white">
    <input type="text" class="item h-13 px-3" placeholder="请输入银联消费批次号">
    <input type="text" class="item h-13 px-3" placeholder="请输入银联消费凭证号">
    <input type="text" class="item h-13 px-3" placeholder="请输入银联消费参考号">
    <div class="item flex justify-between px-3">
      <picker mode="date" class="w-full" :value="date" :start="startDate" :end="endDate" @change="change">
        <div class="flex items-center justify-between">
          <span class="lh-13 opacity-50">请选择交易时间</span>
          <div class="flex items-center">
            <span>{{ currentDate }}</span>
            <div i-material-symbols:arrow-forward-ios class="arrow opacity-20" />
          </div>
        </div>
      </Picker>
    </div>
  </div>

  <div class="mx-3 mt-3 flex items-center text-14px text-blue" @click="alert">
    <div i-bi:question-circle-fill class="mr1" />
    <span>什么是银联消费批次号、凭证号和参考号</span>
  </div>

  <button type="primary" class="mx-3 mb-10 mt-10">
    确认
  </button>
</template>

<style lang="scss" scoped>
.item{border-top: 1px solid #f5f5f5;}
</style>
