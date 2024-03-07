<script setup lang="ts">
import { api } from '~/api'

const news = ref<Data[]>([])
api.home.newList('question').then((res: Data) => {
  news.value = res.data?.data || []
})

async function handler(row: Data) {
  if (row.content) {
    row.show = !row.show
  }
  else {
    row.show = true
    const res = await api.home.newDetail(row.id)
    row.content = res.data?.content || ''
  }
}
</script>

<template>
  <div class="pt-1px">
    <div class="m-3 overflow-hidden rounded">
      <div v-for="(item, index) in news" :key="index" class="item bg-white px-3" @click="handler(item)">
        <div class="flex items-center justify-between lh-12">
          <p>{{ item.title }}</p>
          <div i-ic:outline-arrow-forward-ios class="op50" />
        </div>
        <div v-if="item.show" class="bt-1 b-t b-t-$line b-t-solid py-3">
          <rich-text :nodes="item.content" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item + .item{border-top: 1px solid var(--line);}
</style>
