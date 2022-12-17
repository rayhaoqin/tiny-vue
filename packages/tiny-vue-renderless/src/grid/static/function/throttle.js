/**
 * 创建一个策略函数，当被重复调用函数的时候，至少每隔多少秒毫秒调用一次该函数
 *
 * @param {Function} callback 回调
 * @param {Number} wait 多少秒毫
 * @param {Object} options 参数{leading: 是否在之前执行, trailing: 是否在之后执行}
 * @return {Function}
 */
function throttle(callback, wait, options) {
  let args
  let context
  let ops = options || {}
  let flag = false
  let timeout = 0
  let optLeading = 'leading' in ops ? ops.leading : true
  let optTrailing = 'trailing' in ops ? ops.trailing : false
  let endFn

  const runFn = function () {
    flag = true
    callback.apply(context, args)
    timeout = setTimeout(endFn, wait)
  }

  endFn = function () {
    timeout = 0

    if (!flag && optTrailing === true) {
      runFn()
    }
  }

  const cancelFn = function () {
    let rest = timeout !== 0

    clearTimeout(timeout)
    flag = false
    timeout = 0

    return rest
  }

  const throttled = function () {
    args = arguments
    context = this
    flag = false

    if (timeout === 0) {
      if (optLeading === true) {
        runFn()
      } else if (optTrailing === true) {
        timeout = setTimeout(endFn, wait)
      }
    }
  }

  throttled.cancel = cancelFn

  return throttled
}

export default throttle
