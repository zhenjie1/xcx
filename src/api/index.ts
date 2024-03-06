// request.js
import axios from 'axios'
import * as login from './login'
import * as home from './home'
import * as lookUp from './lookUp'
import * as invoice from './invoice'
import adapter from '~/api/adapter'
import { axiosBefore } from '~/api/before'
import { axiosAfter } from '~/api/after'

export const axiosIns = axios.create({
  adapter,
  baseURL: 'https://pay.pyzjhhdq.com/api/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

axiosBefore(axiosIns)
axiosAfter(axiosIns)

export const api = {
  login,
  home,
  lookUp,
  invoice,
}
