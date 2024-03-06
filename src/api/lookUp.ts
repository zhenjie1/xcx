// export const home = () => uni.request({
//   url: 'https://pay.pyzjhhdq.com/api/index/index',
//     method
//   header: {
//     token: '1111',
//   },
// })

import { axiosIns } from '~/api/index'

export const home = () => axiosIns.get('/index/index')

export const list = () => axiosIns.post('/invoice_title/list')

export const add = (data: Data) => axiosIns.post('/invoice_title/add', data)
export const edit = (data: Data) => axiosIns.post('/invoice_title/edit', data)
export const remove = (id: string) => axiosIns.post('/invoice_title/delete', { id })
export const info = (id: string) => axiosIns.post('/invoice_title/info', { id })
