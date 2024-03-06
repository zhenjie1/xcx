// export const home = () => uni.request({
//   url: 'https://pay.pyzjhhdq.com/api/index/index',
//     method
//   header: {
//     token: '1111',
//   },
// })

import { axiosIns } from '~/api/index'

export const home = () => axiosIns.get('/index/index')

export const newList = (position: string) => axiosIns.post('/news/list', {
  page: 1,
  limit: 100,
  position,
})

export const newDetail = (id: string) => axiosIns.post(`/news/info?news_id=${id}`)
