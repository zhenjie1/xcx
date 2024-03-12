// export const home = () => uni.request({
//   url: 'https://pay.pyzjhhdq.com/api/index/index',
//     method
//   header: {
//     token: '1111',
//   },
// })

import { axiosIns } from '~/api/index'

export const add = (data: Data) => axiosIns.post('/invoice/yl_add', data, {
    showMsg: true
})
