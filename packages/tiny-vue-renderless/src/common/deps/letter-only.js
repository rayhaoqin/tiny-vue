import { on, off } from '@opentiny/vue-renderless/common/deps/dom'

/**
 * v-letter-only
 * @desc 只接受输入非数字字符
 * @example
 * ```vue
 * <input v-letter-only>
 * ```
 */
const checkValue = (event) => {
  if (event.charCode >= 48 && event.charCode <= 57) {
    event.preventDefault()
  }

  return true
}

export default {
  bind(element) {
    on(element, 'keypress', checkValue)
  },
  unbind(element) {
    off(element, 'keypress', checkValue)
  }
}
