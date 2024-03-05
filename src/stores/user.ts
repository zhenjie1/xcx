import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const info = ref<Data>({})
  const setInfo = (infoData: Data) => info.value = infoData

  return {
    info,
    setInfo,
  }
}, {
  persist: {
    enabled: true,
  },
})
