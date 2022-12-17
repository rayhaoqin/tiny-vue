import {
  computedMessage,
  computedStyle,
  computedFontSize,
  computedLabel,
  getInternalValue
} from './index'

export const api = ['state']

export const renderless = (props, { reactive, computed }) => {
  const api = {
    computedMessage: computedMessage({ props }),
    getInternalValue: getInternalValue({ props })
  }
  const state = reactive({
    internalValue: computed(() => api.getInternalValue()),
    label: computed(() => api.computedLabel()),
    style: computed(() => api.computedStyle()),
    message: computed(() => api.computedMessage()),
    fontSize: computed(() => api.computedFontSize())
  })

  Object.assign(api, {
    state,
    computedLabel: computedLabel({ state, props }),
    computedStyle: computedStyle({ state, props }),
    computedFontSize: computedFontSize({ props, state })
  })

  return api
}
