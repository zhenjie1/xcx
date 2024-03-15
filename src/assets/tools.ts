export function apiToPromise<F extends (...args: any[]) => any>(fn: F, option?: Parameters<F>[0]) {
  if (!fn)
    throw new Error('fn is not')

  const { resolve, reject, p } = createPromise<ReturnType<F>>()

  fn({
    ...(option || {}),
    success: (e: any) => {
      if ('cancel' in e && 'confirm' in e) {
        if (e.confirm) resolve()
        else reject()
      }
      resolve(e)
    },
    fail: (e: any) => {
      console.error(e)
      reject(e)
    },
  })

  return p
}

/**
 * promise 错误处理
 */
export function awaitWrap<T, U = any>(promise: Promise<T>): Promise<[U | undefined, T | undefined]> {
  return promise
    .then<[undefined, T]>((data: T) => [undefined, data])
    .catch<[U, undefined]>(err => [err, undefined])
}

export function createPromise<T = any>() {
  let resolve: (value?: T | PromiseLike<T>) => void
  let reject: (reason?: any) => void

  const promise = new Promise<T>((res: any, rej) => {
    resolve = res
    reject = rej
  })
  return {
    p: promise,
    resolve: resolve!,
    reject: reject!,
  }
}

export const tryParse = (str: any) => {
  try {
    if (typeof str === 'string') return JSON.parse(str)
    return str
  }
  catch (err) {
    console.error(err)
    return str
  }
}

export function waitTime(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
export function formatRichText(html) {
  let newContent = html.replace(/<img[^>]*>/gi, (match, capture) => {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '')
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '')
    return match
  })
  newContent = newContent.replace(/style="[^"]+"/gi, (match, capture) => {
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;')
    return match
  })
  newContent = newContent.replace(/<br[^>]*\/>/gi, '')
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"')
  return newContent
}
