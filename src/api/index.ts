// request.js
import axios from 'axios'
import uniAdapter from 'uni-axios-adapter'
import * as login from './login'

// create an axios instance
export const axiosIns = axios.create({
  adapter: uniAdapter,
  baseURL: 'https://pay.pyzjhhdq.comapi/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

export const api = {
  login,
}
