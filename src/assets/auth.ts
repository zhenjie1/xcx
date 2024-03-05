import { apiToPromise } from '~/assets/tools'
import { api } from '~/api'

export async function startAuth() {
  const data = await apiToPromise(uni.login)
  const result = await api.login.login(data.code)
  console.log(data.code, result)
}
