<script setup lang="ts">
const type = reactive({
  type: [
    {label: '公司', value: 'company'},
    {label: '个人', value: 'personal'},
  ],
  value: 'personal',
  handler: (e) => {
    console.log(e.detail.value)
  }
})

const form = ref()
const formData = reactive({
  name: '',
  email: '',
})
const rules = {
  name: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
  ],
}

function submit() {
  this.$refs.form.validate().then(() => {
    console.log('submit')
  })
}
</script>

<template>
  <view class="h-100vh bg-$f8f8f8">
    <view>
      <radio-group @change="type.handler">
        <label class="radio" v-for="(item, i) in type.type" :key="i">
          <radio :value="item.value" :checked="item.value === type.value"/>
          {{ item.label }}</label>
      </radio-group>
    </view>

    <!--  个人  -->
    <view v-if="type.value === 'personal'">
      <uni-forms ref="form" :modelValue="formData" :rules="rules">
        <uni-forms-item label="姓名" name="name">
          <uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名"/>
        </uni-forms-item>
        <uni-forms-item label="邮箱" name="email">
          <input class="input" v-model="formData.email" type="text" placeholder="请输入邮箱"
                 @input="binddata('email',$event.detail.value)"/>
        </uni-forms-item>
      </uni-forms>
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
