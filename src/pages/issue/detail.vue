<script setup lang="ts">
const props = defineProps<{
  type: string
}>()

if (!props.type)
  uni.showToast({ title: 'url参数异常' })

type ListData = {
  title: string
  rows: {
    title: string
    detail: string
    show?: boolean
  }[]
}[]

const list = ref<ListData>([
  {
    title: '业务介绍',
    rows: [
      { title: '什么是高速公路通行费电子发票？', detail: '回家啊回房间卡恢复健康的回复就是海航风呼呼硅谷如意如意也u而已i偶遇给我IE一一个i哦一股恶物业改革与i个够i狗狗' },
      { title: '什么是高速公路通行费电子发票？', detail: '回家啊回房间卡恢复健康的回复就是海航风呼呼硅谷如意如意也u而已i偶遇给我IE一一个i哦一股恶物业改革与i个够i狗狗' },
      { title: '什么是高速公路通行费电子发票？', detail: '回家啊回房间卡恢复健康的回复就是海航风呼呼硅谷如意如意也u而已i偶遇给我IE一一个i哦一股恶物业改革与i个够i狗狗' },
    ],
  },
  {
    title: '开票相关',
    rows: [
      { title: '我通行后为什么看不到可开票记录', detail: '回家啊回房间卡恢复健康的回复就是海航风呼呼硅谷如意如意也u而已i偶遇给我IE一一个i哦一股恶物业改革与i个够i狗狗' },
      { title: '什么是高速公路通行费电子发票？', detail: '回家啊回房间卡恢复健康的回复就是海航风呼呼硅谷如意如意也u而已i偶遇给我IE一一个i哦一股恶物业改革与i个够i狗狗' },
      { title: '开票失败', detail: '回家啊回房间卡恢复健康的回复就是海航风呼呼硅谷如意如意也u而已i偶遇给我IE一一个i哦一股恶物业改革与i个够i狗狗' },
      { title: '邮箱填写错误', detail: '回家啊回房间卡恢复健康的回复就是海航风呼呼硅谷如意如意也u而已i偶遇给我IE一一个i哦一股恶物业改革与i个够i狗狗' },
      { title: '我可以开多长时间的票', detail: '回家啊回房间卡恢复健康的回复就是海航风呼呼硅谷如意如意也u而已i偶遇给我IE一一个i哦一股恶物业改革与i个够i狗狗' },
    ],
  },
])

initListStatus()

function initListStatus() {
  list.value.forEach((item) => {
    item.rows.forEach((r) => {
      r.show = false
    })
  })
}

// const listData = computed(() => {
//   return list.value.map((item) => {
//     item.rows.map((r) => {
//       r.show = false
//       return r
//     })
//     return item
//   })
// })

const phone = ref('400-832-1234')
function tellHandler() {
  uni.makePhoneCall({
    phoneNumber: phone.value,
  })
}
</script>

<template>
  <ul class="max-h-100vh overflow-y-auto pt-1px">
    <li v-for="(item, index) in list" :key="index" class="item">
      <h2 class="mx-4 mb-2 mt4 opacity-60">
        {{ item.title }}
      </h2>
      <ul class="bg-white">
        <li v-for="(row, i) in item.rows" :key="i" class="row mx-4" @click="row.show = !row.show">
          <div class="item flex justify-between py-4">
            <span>{{ row.title }}</span>
            <div i-material-symbols:arrow-forward-ios class="arrow opacity-20" :class="{ show: row.show }" />
          </div>
          <p v-if="row.show" class="pb-3 text-14px op-50">
            {{ row.detail }}
          </p>
        </li>
      </ul>
    </li>
  </ul>
  <p class="tell mb-4 mt-10 text-center" @click="tellHandler">
    联系客服：  {{ phone }}
  </p>
</template>

<style lang="scss" scoped>
.row + .row{
  .item{border-top: 1px solid #f5f5f5;}
}

.arrow{transition: transform .3s;}
.show{
  transform: rotate(90deg);
}

.tell{color: $uni-color-primary;}
</style>
