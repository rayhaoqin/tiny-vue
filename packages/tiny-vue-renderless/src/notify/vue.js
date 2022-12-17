import {
  clearTimer,
  startTimer,
  close,
  bindEvent,
  unBindEvent,
  click,
  watchClosed,
  getOffsetStyle,
  getPositionSide,
  getZindex
} from './index'

export const api = [
  'state',
  'clearTimer',
  'startTimer',
  'close',
  'bindEvent',
  'unBindEvent',
  'click',
  'watchClosed',
  'getOffsetStyle',
  'getPositionSide',
  'getZindex'
]

export const renderless = (props, { computed, onBeforeUnmount, onMounted, reactive, watch }, { emit }) => {
  const api = {}
  const state = reactive({
    timer: null,
    closed: false,
    visible: true,
    duration: computed(() => props.duration),
    showClose: true,
    verticalOffset: 0,
    position: computed(() => props.position),
    dangerouslyUseHTMLString: false,
    positionStyle: computed(() => api.getOffsetStyle(state)),
    verticalProperty: computed(() => api.getPositionSide(state)),
    customClass: computed(() => props.customClass)
  })

  Object.assign(api, {
    state,
    getZindex,
    getOffsetStyle,
    getPositionSide,
    close: close({ state, props }),
    click: click({ emit, state }),
    clearTimer: clearTimer(state),
    bindEvent: bindEvent({ api, state }),
    unBindEvent: unBindEvent(api),
    startTimer: startTimer({ api, state }),
    watchClosed: watchClosed(state)
  })

  watch(() => state.closed, api.watchClosed, { immediate: true })

  onMounted(api.bindEvent)
  onBeforeUnmount(api.unBindEvent)

  return api
}
