import {
  handleClick,
  getStatusCls,
  getStatus,
  computedData,
  getDate,
  computedCurrent,
  computedIsReverse
} from './index'

export const api = ['state', 'handleClick', 'getStatusCls', 'getStatus', 'getDate']

export const renderless = (props, { computed, reactive }, { t, emit, constants }) => {
  const api = {}
  const state = reactive({
    nodes: computed(() => api.computedData()),
    current: computed(() => api.computedCurrent()),
    isReverse: computed(() => api.computedIsReverse())
  })

  Object.assign(api, {
    state,
    getDate,
    computedData: computedData({ props, state }),
    computedCurrent: computedCurrent({ props, state }),
    computedIsReverse: computedIsReverse(props),
    getStatus: getStatus({ state, t }),
    handleClick: handleClick({ emit, state, api }),
    getStatusCls: getStatusCls({ constants, props, state })
  })

  return api
}
