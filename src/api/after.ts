import type { AxiosInstance } from 'axios'

export function axiosAfter(axios: AxiosInstance) {
  axios.interceptors.response.use((response) => {

    const { code, msg } = response.data || {}
    if (code !== 1 && msg) {
      uni.showToast({
        title: msg,
        icon: 'error'
      })
      throw new Error(msg)
    }
    return response.data
  })
}
