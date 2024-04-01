<script setup lang="ts">
import { api } from '~/api'
import { apiToPromise } from '~/assets/tools'

const props = defineProps<{
  id?: string
}>()

const type = reactive({
  type: [
    { label: '公司', value: 'company' },
    { label: '个人', value: 'personal' },
  ],
  value: 'personal',
  handler: (e: any) => {
    type.value = e.detail.value
  },
})

const formData = reactive({
  name: '',
  tax_number: '',
  bank: '',
  address: '',
  phone: '',
  bank_num: '',
})
if (props.id) {
  api.lookUp.info(props.id).then((res) => {
    Object.assign(formData, res.data || {})
    type.value = res.data?.type == 1 ? 'company' : 'personal'
  })
}

function verify() {
  let message = ''
  if (type.value === 'personal') {
    if (!formData.name) message = '请输入姓名'
  }
  else {
    const taxLen = formData.tax_number?.length || 0
    const phoneLen = formData.phone?.length || 0
    if (!formData.name) message = '请输入姓名'
    else if (!formData.tax_number) message = '请输入税号'
    else if (taxLen < 13 || taxLen > 20) message = '税号格式不正确'
    // else if (!formData.phone) message = '请输入单位电话'
    // else if (phoneLen > 11) message = '电话格式不正确'
    // else if (!formData.address) message = '请输入单位地址'
    // else if (!formData.bank) message = '请输入开户银行'
    // else if (!formData.bank_num) message = '请输入银行账号'
  }

  return message
}

async function submit() {
  const message = verify()
  if (message) {
    uni.showToast({
      icon: 'none',
      title: message,
    })
    return
  }

  const fApi = props.id ? api.lookUp.edit : api.lookUp.add
  await fApi({
    ...formData,
    type: type.value === 'personal' ? 2 : 1,
  })

  router.back()
}

async function remove() {
  await apiToPromise(uni.showModal, {
    title: '提示',
    content: '确定删除此发票抬头？',
  })
  await api.lookUp.remove(props.id!)
  router.back()
}
</script>

<template>
  <view class="h-100vh pt-1px">
    <view class="mt-4 b-1px b-#e6e6e6 b-b-solid b-t-solid bg-white py-4">
      <radio-group @change="type.handler">
        <label v-for="(item, i) in type.type" :key="i" class="radio ml-4">
          <radio :value="item.value" :checked="item.value === type.value" />
          {{ item.label }}</label>
      </radio-group>
    </view>

    <!--  个人  -->
    <view class="form mt-10 b-1px b-#e6e6e6 b-b-solid b-t-solid bg-white">
      <ul v-if="type.value === 'company'" class="">
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">名称</span>
          <input v-model="formData.name" type="text" placeholder="公司完整名称" class="h-13 flex-1">
        </li>
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">税号</span>
          <input v-model="formData.tax_number" type="text" placeholder="纳税人识别号（13-20位必填）" class="h-13 flex-1">
        </li>
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">电话号码</span>
          <input v-model="formData.phone" type="text" placeholder="电话号码" class="h-13 flex-1">
        </li>
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">单位地址</span>
          <input v-model="formData.address" type="text" placeholder="公司地址" class="h-13 flex-1">
        </li>
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">开户银行</span>
          <input v-model="formData.bank" type="text" placeholder="公司开户银行" class="h-13 flex-1">
        </li>
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">银行账号</span>
          <input v-model="formData.bank_num" type="text" placeholder="公司银行账号" class="h-13 flex-1">
        </li>
      </ul>
      <ul v-else class="">
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">姓名</span>
          <input v-model="formData.name" type="text" placeholder="姓名（必填）" class="h-13 flex-1">
        </li>
      </ul>
    </view>

    <button type="primary" class="mx-4 mt-10" @click="submit">
      保 存
    </button>

    <button v-if="props.id" class="mx-4 mt-3 bg-red text-white" @click="remove">
      删 除
    </button>
  </view>
</template>

<style scoped lang="scss">
.form{
  .item{margin: 0 30rpx;}
  .item + .item{border-top: 1px solid #f5f5f5;}
}
</style>
