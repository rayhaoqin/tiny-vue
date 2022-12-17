import { on, off } from '@opentiny/vue-renderless/common/deps/dom'

/**
 * v-number-only
 * @desc 只接受输入数字
 * @example
 * ```vue
 * <input v-number-only>
 * ```
 */
const checkValue = (event) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, '')

  if (event.charCode >= 48 && event.charCode <= 57) {
    return true
  }

  event.preventDefault()
}

export default {
  bind(element) {
    on(element, 'keypress', checkValue)
  },
  unbind(element) {
    off(element, 'keypress', checkValue)
  }
}
