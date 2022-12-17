import ResizeObserver from '@opentiny/vue-renderless/common/deps/ResizeObserver'

const isServer = typeof window === 'undefined'
const cacheKey = '__resizeListeners__'

/* istanbul ignore next */
const resizeHandler = (entries) => {
  entries.forEach((entry) => {
    const listeners = entry.target[cacheKey] || []

    if (listeners.length) {
      listeners.forEach((fn) => {
        fn()
      })
    }
  })
}

/* istanbul ignore next */
export const addResizeListener = (el, fn) => {
  if (isServer) return

  if (!el[cacheKey]) {
    el[cacheKey] = []
    el.__ro__ = new ResizeObserver(resizeHandler)
    el.__ro__.observe(el)
  }

  el[cacheKey].push(fn)
}

/* istanbul ignore next */
export const removeResizeListener = (el, fn) => {
  if (!el || !el[cacheKey]) return

  el[cacheKey].splice(el[cacheKey].indexOf(fn), 1)

  if (!el[cacheKey].length) {
    el.__ro__.disconnect()
  }
}
