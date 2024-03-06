import type { AxiosInstance } from 'axios'
import { useUserStore } from '~/stores/user'

export function axiosBefore(axios: AxiosInstance) {
  axios.interceptors.request.use((config) => {
    const userStore = useUserStore()

    // config.header = {}
    config.headers.token = userStore.info.token
    console.log(`headers -> ${config.url}`, config.headers)

    return config
  })
}
