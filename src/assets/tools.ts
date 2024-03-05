export function apiToPromise<F extends (...args: any[]) => any>(fn: F) {
  if (!fn)
    throw new Error('fn is not')

  const { resolve, reject, p } = createPromise<ReturnType<F>>()
  fn({
    success: (e: any) => {
      console.log('成功', e)
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
