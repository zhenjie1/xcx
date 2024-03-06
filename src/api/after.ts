import type { AxiosInstance } from 'axios'

export function axiosAfter(axios: AxiosInstance) {
  axios.interceptors.response.use((response) => {
    return response.data
  })
}
