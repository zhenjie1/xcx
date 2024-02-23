<script setup>
const list = reactive([{
  title: '我要开发票',
  sub: '去开发票',
  link: '/pages/invoiceList'
},
  {
    title: '我的发票',
    sub: '已开/未开发票',
    link: '/pages/invoiceList'
  },
  {
    title: '抬头发票',
    sub: '编辑信息',
    link: '/pages/invoiceList'
  },
  {
    title: '常见问题',
    sub: '答疑解惑',
    link: '/pages/invoiceList'
  },
])

function handlerItem(row) {
  router.push(row.link)
}
</script>

<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view class="boxContainer">
    <view class="uni-margin-wrap">
      <swiper class="swiper">
        <swiper-item>
          <view class="swiper-item uni-bg-red">A</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-green">B</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-blue">C</view>
        </swiper-item>
      </swiper>
    </view>

    <view class="titleMax">
      <view class="t1">发票服务</view>
      <view class="t2">银联云闪付用户开票 ></view>
    </view>

    <view class="listBox">
      <view class="item" v-for="(item, index) in list" :key="index" @click="handlerItem(item)">
        <view class="box">
          <view class="t1">{{ item.title }}</view>
          <view class="t2">{{ item.sub }}</view>
        </view>
        <view class="icon"></view>
      </view>
    </view>

    <view class="titleMax">
      <view class="t1">自助服务</view>
    </view>

    <view class="server">
      <view class="text">
        <view class="title">自助服务</view>
        <view class="sub">快速解决您的发票问题烦恼~</view>
      </view>
      <view class="icon"></view>
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
  background-color: rgba(0, 0, 0, .04);
}

.swiper {
  height: 300rpx;
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
