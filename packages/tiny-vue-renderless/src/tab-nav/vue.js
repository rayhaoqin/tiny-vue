import {
  computedNavStyle,
  computedSizeName,
  updated,
  visibilityChangeHandler,
  windowBlurHandler,
  windowFocusHandler,
  scrollToActiveTab,
  scrollIntoView,
  mounted,
  moreTabShow,
  beforeUnmount,
  scrollPrev,
  scrollNext,
  changeTab,
  setFocus,
  removeFocus
} from './index'

export const api = [
  'state',
  'setFocus',
  'removeFocus',
  'scrollPrev',
  'scrollNext',
  'changeTab',
  'scrollToActiveTab',
  'scrollIntoView',
  'moreTabShow',
  'swiperHandle'
]

export const renderless = (props, { computed, watch, inject, onBeforeUnmount, onMounted, onUpdated, reactive }, { parent, refs, nextTick, mode: tinyMode }) => {
  const api = { mounted, beforeUnmount, computedNavStyle, computedSizeName }
  const state = reactive({
    navOffset: 0,
    lineOffset: 0,
    lineWidth: 0,
    scrollable: false,
    isFocus: false,
    focusable: false,
    showMoreItem: false,
    isActive: false,
    showMoreTabs: props.showMoreTabs,
    mode: props._mode || parent.$mode || (tinyMode ? tinyMode.value : 'pc'),
    rootTabs: inject('rootTabs'),
    sizeName: computed(() => api.computedSizeName(state)),
    navStyle: computed(() => api.computedNavStyle(state))
  })
  Object.assign(api, {
    state,
    setFocus: setFocus(state),
    removeFocus: removeFocus(state),
    moreTabShow: moreTabShow(state),
    scrollPrev: scrollPrev({ refs, state }),
    scrollNext: scrollNext({ refs, state }),
    windowBlurHandler: windowBlurHandler(state),
    windowFocusHandler: windowFocusHandler(state),
    visibilityChangeHandler: visibilityChangeHandler(state),
    scrollToActiveTab: scrollToActiveTab({ props, parent, refs, state }),
    scrollIntoView: scrollIntoView({ props, parent, refs, state })
  })

  watch(
    () => props.currentName,
    () => {
      nextTick(() => {
        const tabBarVnode = refs.tabBar
        if (tabBarVnode) {
          tabBarVnode.state.barStyle = tabBarVnode.computedBarStyle(tabBarVnode, state)
        }
      })
    },
    { immediate: true }
  )

  Object.assign(api, { updated: updated({ api, props, refs, state }), changeTab: changeTab(api) })
  onUpdated(() => api.updated())
  onMounted(() => api.mounted({ api, parent }))
  onBeforeUnmount(() => api.beforeUnmount({ api, parent }))

  return api
}
