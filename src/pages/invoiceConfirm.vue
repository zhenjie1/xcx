<script setup lang="ts">
import { invoiceState } from '../assets/invoice'
import { api } from '~/api'

const { title_data, invoices } = invoiceState

const numbers = ['一', '二', '三', '四', '五', '六', '七']

const email = ref('')
async function submit() {
  if (!email.value) return uni.showToast({
    title: '请输入邮箱地址',
    icon: 'none',
  })

  if (invoiceState.invoiceType) {
    const pay_type = invoiceState.invoiceType === 'cash' ? '4' : '3'
    await api.invoice.cashAndUnionPayAdd({
      ids: invoices.map(v => v.id).join(','),
      title_id: String(title_data.id),
      email: email.value,
      pay_type,
    })
  }
  else {
    await api.invoice.add({
      ids: invoices.map(v => v.id).join(','),
      title_id: title_data.id,
      email: email.value,
    })
  }

  uni.reLaunch({
    url: '/pages/invoiceList?status=2',
  })
}
</script>

<template>
  <div class="min-h-100vh bg-#f5f5f5 p-3">
    <p class="text-14px op-50">
      邮箱
    </p>
    <input v-model="email" type="text" placeholder="请输入邮箱地址" class="mt-1 h-12 rounded bg-white px-3">

    <p class="mt-3 text-14px op-50">
      发票抬头
    </p>
    <div class="relative mt-1 rounded bg-white p-3">
      <div class="flex items-center justify-between">
        <p>{{ title_data.name }}</p>
        <span class="op-60">{{ title_data.type == 1 ? '企业' : '个人' }}</span>
      </div>
      <div v-if="title_data.type == 1" class="mt-1">
        <div>
          <span class="op-50">税号：</span>
          <span>{{ title_data.tax_number }}</span>
        </div>
        <image src="../../static/zhang.png" class="absolute bottom-1 right-3 h-12 w-24" />
      </div>
    </div>

    <div v-for="(item, index) in invoices" :key="index" class="mt-3">
      <p class="text-14px op-50">
        发票{{ numbers[index] }}
      </p>
      <div class="mt-1 rounded bg-white p-3">
        <p>黄河大桥通行费发票</p>
        <p class="mt-2 flex items-center justify-between b-t b-t-#e6e6e6 b-t-dashed pt-2 text-14px op-50">
          <span>发票金额</span>
          <span>{{ item.money }}元</span>
        </p>
      </div>
    </div>

    <button type="primary" class="mt-6" @click="submit">
      提交开票
    </button>
  </div>
</template>

<style scoped lang="scss">

</style>
