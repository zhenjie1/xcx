import type { AxiosInstance } from 'axios'
import { useUserStore } from '~/stores/user'

export function axiosBefore(axios: AxiosInstance) {
  axios.interceptors.request.use((config) => {
    const userStore = useUserStore()

    // config.header = {}
    if (userStore.info.token)
      config.headers.token = userStore.info.token

    return config
  })
}
