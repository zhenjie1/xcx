// export const home = () => uni.request({
//   url: 'https://pay.pyzjhhdq.com/api/index/index',
//     method
//   header: {
//     token: '1111',
//   },
// })

import { axiosIns } from '~/api/index'

export const list = (status: string, page = 1, size = 10) => axiosIns.get('/invoice/list', {
  params: {
    page,
    limit: size,
    status,
  },
})

export const add = (data: Data) => axiosIns.post('/invoice/add', data, {
  showMsg: true,
})

// export const view = () => axiosIns.

export const download = (id: string) => axiosIns.post('/invoice/downUrl', {
  id,
})

// 对失败的再次开票
export const rebill = (id: string) => axiosIns.post('/invoice/again_add', { id }, {
  showMsg: true,
})
