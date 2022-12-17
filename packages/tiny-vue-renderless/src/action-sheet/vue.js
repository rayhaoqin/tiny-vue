import { visibleHandle, watchVisible, menuHandle } from './index'

export const api = ['state', 'visibleHandle', 'menuHandle']

export const renderless = (props, { reactive, watch }, { emit }) => {
  const api = {}
  const state = reactive({
    toggle: false,
    active: null
  })

  watch(() => props.visible, api.watchVisible)

  Object.assign(api, {
    state,
    menuHandle: menuHandle({ state, emit }),
    visibleHandle: visibleHandle(emit),
    watchVisible: watchVisible({ emit, props, state })
  })

  return api
}
