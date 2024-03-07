import { axiosIns } from '~/api/index'

// 微信生效
// #ifdef MP-WEIXIN
const loginPath = '/user/xcx_login'
// #endif

// 支付宝生效
// #ifdef MP-ALIPAY
const loginPath = '/user/zfb_login'
// #endif

export const login = (code: string) => axiosIns.get(loginPath, {
  params: { code },
})
