import type { AxiosPromise, InternalAxiosRequestConfig } from 'axios'

export {}

declare module 'axios' {
  interface AxiosRequestConfig {
    showToast?: boolean
  }
}

const getResponse = (res: any, config: any) => {
  const { statusCode, errMsg } = res
  return {
    ...res,
    status: statusCode,
    statusText: errMsg,
    config,
    request: null,
  }
}

export default async function adapter(config: InternalAxiosRequestConfig): AxiosPromise {
  if (!uni) {
    throw new Error('please use this in uni-app project!')
  }

  return new Promise((resolve, reject) => {
    const { baseURL = '', url = '', headers, data, params } = config
    const uniConfig = {
      ...config,
      url: baseURL + url,
      header: { ...headers },
    }
    // console.log(`headers -> ${uniConfig.url}`, { ...headers })

    if (data || params) {
      try {
        uniConfig.data = JSON.parse(data || params)
      }
      catch (e) {
        uniConfig.data = data || params
      }
    }
    uni.request({
      ...uniConfig,
      success: (res) => {
        const response = getResponse(res, config)
        resolve(response)
      },
      fail: (res) => {
        const response = getResponse(res, config)
        reject(response)
      },
    })
  })
}
