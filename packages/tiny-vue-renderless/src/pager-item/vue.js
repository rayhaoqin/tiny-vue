import { getPages, onPagerClick, onMouseenter } from './index'

export const api = ['state', 'onPagerClick', 'onMouseenter']

export const renderless = (
  props,
  { computed, reactive, watch },
  { emit, vm }
) => {
  const api = {
    onPagerClick: onPagerClick({ emit, props, vm })
  }

  const state = reactive({
    current: null,
    showPrevMore: false,
    showNextMore: false,
    quicknextIconClass: props.popupIcon,
    quickprevIconClass: props.popupIcon,
    pagers: computed(() => api.getPages())
  })

  Object.assign(api, {
    state,
    getPages: getPages({ props, state }),
    onMouseenter: onMouseenter({ props, state })
  })

  watch(
    () => state.showPrevMore,
    (value) => {
      if (!value) state.quickprevIconClass = props.popupIcon
    },
    { immediate: true }
  )

  watch(
    () => state.showNextMore,
    (value) => {
      if (!value) state.quicknextIconClass = props.popupIcon
    },
    { immediate: true }
  )

  return api
}
