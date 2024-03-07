import {apiToPromise, awaitWrap} from '~/assets/tools'
import { api } from '~/api'
import { useUserStore } from '~/stores/user'

export async function startAuth() {
  const [err, data] = await awaitWrap(apiToPromise(uni.login))

  if (err) {
    if (err.errMsg) uni.showToast({
      title: err.errMsg,
      icon: 'none'
    })
    return
  }

  const result = await api.login.login(data.code)

  const userStore = useUserStore()
  userStore.setInfo(result.data || {})
}
