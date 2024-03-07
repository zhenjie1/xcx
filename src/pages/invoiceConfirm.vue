<script setup lang="ts">
import {invoiceState} from '../assets/invoice'
import {api} from "~/api";

const {title_data, invoices} = invoiceState

const numbers = ['一', '二', '三', '四', '五', '六', '七']

const email = ref('')
async function submit () {
  if (!email.value) return uni.showToast({
    title: '请输入邮箱地址',
    icon: 'none'
  })

  api.invoice.add({
    ids: invoices.map(v => v.id).join(','),
    title_id: title_data.id,
    email: email.value
  })
}
</script>

<template>
  <div class="p-3">
    <p class="text-14px op-50">邮箱</p>
    <input type="text" v-model="email" placeholder="请输入邮箱地址" class="bg-white px-3 h-12 mt-1 rounded">

    <p class="text-14px op-50 mt-3">发票抬头</p>
    <div class="bg-white p-3 rounded mt-1">
      <div class="flex justify-between items-center">
        <p>{{ title_data.name }}</p>
        <span class="op-60">{{ title_data.type == 1 ? '企业' : '个人' }}</span>
      </div>
      <div v-if="title_data.type == 1" class="mt-1">
        <div>
          <span class="op-50">税号：</span>
          <span>{{ title_data.tax_number }}</span>
        </div>
      </div>
    </div>

    <div v-for="(item, index) in invoices" :key="index" class="mt-3">
      <p class="text-14px op-50">发票{{numbers[index]}}</p>
      <div class="bg-white p-3 rounded mt-1">
        <p>黄河大桥通行费发票</p>
        <p class="flex items-center justify-between text-14px op-50 b-t b-t-dashed b-t-#e6e6e6 pt-2 mt-2">
          <span>发票金额</span>
          <span>{{item.money}}元</span>
        </p>
      </div>
    </div>

    <button type="primary" class="mt-6" @click="submit">提交开票</button>
  </div>
</template>

<style scoped lang="scss">

</style>
