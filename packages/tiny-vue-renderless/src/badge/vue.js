import { computedContent, computedValueRef } from './index'
import { xss } from '@opentiny/vue-renderless/common/xss'

export const api = ['state']

export const renderless = (props, { computed, reactive }) => {
  const api = {
    computedValueRef: computedValueRef({ props })
  }

  const state = reactive({
    isOverstep: false,
    valueRef: computed(() => api.computedValueRef()),
    content: computed(() => api.computedContent()),
    href: computed(() => xss.filterUrl(props.href))
  })

  api.state = state
  api.computedContent = computedContent({ props, state })

  return api
}
