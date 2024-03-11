<script setup lang="ts">
import { api } from '~/api'
import icon1 from '../static/home1.png'
import icon2 from '../static/home2.png'
import icon3 from '../static/home3.png'
import icon4 from '../static/home4.png'
import TheModal from "~/components/TheModal.vue";

const data = ref({
  banner: [] as Data[],
  news: [] as Data[],
})
const firstNew = computed(() => data.value.news?.[0])

api.home.home().then((res: Data) => {
  data.value = res.data
})

const list = reactive([{
  title: '我要开发票',
  sub: '去开发票',
  link: '/pages/invoiceList',
  icon: icon1,
  query: { status: '1' }
}, {
  title: '我的发票',
  sub: '已开/未开发票',
  link: '/pages/invoiceList',
  icon: icon2,
  query: { status: '2' }
}, {
  title: '抬头发票',
  sub: '编辑信息',
  link: '/pages/lookUp',
  icon: icon3,
},
//   {
//   title: '常见问题',
//   sub: '答疑解惑',
//   link: '/pages/issue/index',
//   icon: icon4,
// }
])

function handlerItem(row) {
  router.push({
    path: row.link,
    query: row.query
  })
}
</script>

<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view class="boxContainer pt-1px">
    <view v-if="firstNew" class="flex items-center gap-2 bg-[#fff7d2] p-2 text-[14px] text-orange-500" @click="router.push('/pages/bulletin')">
      <view i-mingcute:announcement-line class="flex-shrink-0" />
      <span>{{ firstNew.title }}</span>
    </view>

    <view class="uni-margin-wrap rounded overflow-hidden">
      <swiper class="swiper">
        <swiper-item v-for="(item, index) in data.banner" :key="index">
          <view class="swiper-item">
            <image :src="item.image" class="image" mode="aspectFill" />
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="titleMax">
      <view class="t1">
        发票服务
      </view>
      <view class="t2 py-1" @click="router.push('/pages/unionPay')">
        银联云闪付用户开票 >
      </view>
    </view>

    <view class="listBox">
      <view v-for="(item, index) in list" :key="index" class="item" @click="handlerItem(item)">
        <view class="box">
          <view class="t1">
            {{ item.title }}
          </view>
          <view class="t2">
            {{ item.sub }}
          </view>
        </view>
        <image class="icon" :src="item.icon"></image>
<!--        <view class="icon" />-->
      </view>
    </view>

    <view class="titleMax">
      <view class="t1">
        常见问题
      </view>
    </view>

    <view class="server" @click="router.push({path: '/pages/issue/index'})">
      <view class="text">
        <view class="title">
          常见问题
        </view>
        <view class="sub">
          快速解决您的发票问题烦恼~
        </view>
      </view>
      <view class="icon" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.server {
  background-color: #f8fcff;
  padding: 20rpx;
  margin: 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .text {
    .sub {
      opacity: .5;
      font-size: 24rpx;
      margin-top: 10rpx;
    }
  }
}

.listBox {
  margin: 20rpx;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;

  .item {
    background-color: #f8fcff;
    padding: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .t2 {
      opacity: .5;
      font-size: 24rpx;
      margin-top: 4rpx;
    }

    .icon {
      background-color: rgba(0, 0, 0, .04);
      border-radius: 50%;
      width: 70rpx;
      height: 70rpx;
    }
  }
}

.uni-margin-wrap {
  width: 690rpx;
  margin: 20rpx;
  width: calc(100% - 40rpx);
}

.swiper {
  height: 300rpx;
  .image{height: 100%;width: 100%;}
}

.swiper-item {
  display: block;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
}

.swiper-list {
  margin-top: 40rpx;
  margin-bottom: 0;
}

.boxContainer {}

.titleMax {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30rpx 20rpx 20rpx;

  .t1 {
    font-size: 36rpx;
    font-weight: 500;
  }

  .t2 {
    color: $uni-color-primary;
    font-size: 24rpx;
  }
}
</style>
