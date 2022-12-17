import { on, once } from '@opentiny/vue-renderless/common/deps/dom'

export default (el, binding) => {
  let interval = null
  let startTime

  const handler = () => {
    typeof binding.value === 'function' && binding.value.apply()
  }

  const clear = () => {
    if (Date.now() - startTime < 100) {
      handler()
    }

    clearInterval(interval)
    interval = null
  }

  on(el, 'mousedown', (e) => {
    if (e.button !== 0) {
      return
    }

    startTime = Date.now()
    once(document, 'mouseup', clear)
    clearInterval(interval)
    interval = setInterval(handler, 100)
  })
}
