<script setup lang="ts">
const type = reactive({
  type: [
    { label: '公司', value: 'company' },
    { label: '个人', value: 'personal' },
  ],
  value: 'personal',
  handler: (e) => {
    type.value = e.detail.value
  },
})

const form = ref()
const formData = reactive({
  name: '',
  email: '',
})
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
}

function submit() {
  this.$refs.form.validate().then(() => {
    console.log('submit')
  })
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
          <span class="mr-4 w-16 lh-13">名字</span>
          <input type="text" placeholder="公司完整名称（必填）" class="h-13 flex-1">
        </li>
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">税号</span>
          <input type="text" placeholder="纳税人识别号（13-20位必填）" class="h-13 flex-1">
        </li>
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">单位地址</span>
          <input type="text" placeholder="公司地址" class="h-13 flex-1">
        </li>
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">开户银行</span>
          <input type="text" placeholder="公司开户银行" class="h-13 flex-1">
        </li>
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">银行账号</span>
          <input type="text" placeholder="公司银行账号" class="h-13 flex-1">
        </li>
      </ul>
      <ul v-else class="">
        <li class="item flex">
          <span class="mr-4 w-16 lh-13">姓名</span>
          <input type="text" placeholder="姓名（必填）" class="h-13 flex-1">
        </li>
      </ul>
    </view>

    <button type="primary" class="mx-4 mt-10">
      保 存
    </button>
  </view>
</template>

<style scoped lang="scss">
.form{
  .item{margin: 0 30rpx;}
  .item + .item{border-top: 1px solid #f5f5f5;}
}
</style>
