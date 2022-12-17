import {
  computedIsClosable,
  computedActive,
  computedPaneName,
  watchTitle
} from './index'

export const api = ['state']

export const renderless = (
  props,
  { computed, inject, reactive, watch },
  { parent, nextTick }
) => {
  const api = {
    watchTitle: watchTitle(parent),
    computedIsClosable: computedIsClosable({ parent, props })
  }

  const state = reactive({
    index: null,
    loaded: false,
    animateShow: true,
    rootTabs: inject('rootTabs'),
    active: computed(() => api.computedActive()),
    paneName: computed(() => api.computedPaneName()),
    isClosable: computed(() => api.computedIsClosable())
  })

  Object.assign(api, {
    state,
    computedActive: computedActive({ parent, nextTick, props, state }),
    computedPaneName: computedPaneName({ props, state })
  })

  watch(() => props.title, api.watchTitle)

  return api
}
