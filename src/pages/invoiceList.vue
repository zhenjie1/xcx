<template>
	<view class="container">
		<view class="topFixed">
			<view v-for="(item, i) in tab.nav" :key="item.key" @click="tab.handler(item)" class="item" :class="{'active': item.key === tab.active, [`item-${i}`]: true }">
				{{ item.text }}
			</view>
		</view>

		<view class="emitContainer" v-if="list.length === 0">
			<div class="box">
				<image src="../../static/empty.svg" style="width: 500rpx;height: 500rpx;margin:auto;display: block;margin-bottom: -40rpx;" mode=""></image>
				<p class="p p1">找不到可开票记录？点击试试用订单搜索</p>
				<p class="p p1">试试扫描二维码</p>
				<p class="p p1">试试输入序列号</p>
			</div>
		</view>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
const tab = reactive({
	nav: [
		{ text: '未开票账单', key: 'no' },
		{ text: '已开票账单', key: 'yes' },
	],
	active: 'no',
  handler: row => tab.active = row.key
})

const list = ref([])

</script>

<style lang="scss" scoped>
.container{
	background-color: rgba(0,0,0,.03);
	height: 100vh;

	.emitContainer{height: 90vh;display: flex;
		.box{margin: auto;}
		.p{color: $uni-color-primary;margin-bottom: 40rpx;text-align: center;font-size: 24rpx;}
	}
}
.topFixed{position: fixed;top:0;left: 0;width: 100%;display: flex;background-color: white;
	.item{flex: 1;text-align: center;line-height: 40rpx;padding: 20rpx 0;color: #999;}
	.item-1{position: relative;
    &:before{content: '';display: block;border-left: 1px solid #e6e6e6;width: 1rpx;height: 50%;position: absolute;left:0;top:50%;transform: translateY(-50%);}
  }
	.item.active{color: $uni-color-primary;}
}
</style>
