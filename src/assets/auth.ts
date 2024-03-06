import { apiToPromise } from '~/assets/tools'
import { api } from '~/api'
import { useUserStore } from '~/stores/user'

export async function startAuth() {
  const data = await apiToPromise(uni.login)
  const result = await api.login.login(data.code)

  const userStore = useUserStore()
  userStore.setInfo(result.data || {})
}
