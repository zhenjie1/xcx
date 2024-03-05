import { axiosIns } from '~/api/index'

export const login = (code: string) => axiosIns.get('/user/xcx_login', {
  params: { code },
})
