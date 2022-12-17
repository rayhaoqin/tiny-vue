import { close, computedGetIcon, computedGetTitle } from './index'

export const api = ['close', 'state']

export const renderless = (
  props,
  { computed, reactive },
  { t, emit, constants }
) => {
  const api = {
    computedGetIcon: computedGetIcon({ constants, props }),
    computedGetTitle: computedGetTitle({ constants, props, t })
  }

  const state = reactive({
    show: true,
    getIcon: computed(() => api.computedGetIcon()),
    getTitle: computed(() => api.computedGetTitle())
  })

  Object.assign(api, {
    state,
    close: close({ state, emit })
  })

  return api
}
