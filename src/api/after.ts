import type { AxiosInstance } from 'axios'
import {waitTime} from "~/assets/tools";

export function axiosAfter(axios: AxiosInstance) {
  axios.interceptors.response.use(async (response) => {
    const { code, msg } = response.data || {}
    const { showMsg = false } = response.config
    if ((showMsg || code !== 1) && msg) {
      uni.showToast({
        title: msg,
        icon: 'error',
      })

      await waitTime(1500)
    }
    if (code !== 1) throw new Error(msg)
    return response.data
  })
}
