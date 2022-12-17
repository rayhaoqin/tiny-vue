import {
  clearTimer,
  startTimer,
  close,
  handleAfterLeave,
  bindEvent,
  unBindEvent,
  destroy,
  watchClosed,
  getTypeClass,
  getOffsetStyle,
  getZindex
} from './index'

export const api = ['state', 'handleAfterLeave', 'clearTimer', 'startTimer', 'close', 'getZindex']

export const renderless = (
  props,
  { computed, onBeforeUnmount, onMounted, reactive, watch },
  { vm, parent, constants }
) => {
  const api = {}
  const state = reactive({
    timer: null,
    message: '',
    type: 'info',
    iconClass: '',
    onClose: null,
    closed: false,
    center: false,
    buttons: null,
    duration: 3000,
    visible: false,
    customClass: '',
    showClose: false,
    verticalOffset: 20,
    dangerouslyUseHTMLString: false,
    typeClass: computed(() => api.getTypeClass()),
    positionStyle: computed(() => api.getOffsetStyle())
  })

  Object.assign(api, {
    state,
    getZindex,
    close: close(state),
    destroy: destroy(parent),
    clearTimer: clearTimer(state),
    getOffsetStyle: getOffsetStyle({ state }),
    getTypeClass: getTypeClass({ constants, state }),
    bindEvent: bindEvent({ api, state }),
    startTimer: startTimer({ api, state }),
    unBindEvent: unBindEvent({ api, state }),
    handleAfterLeave: handleAfterLeave(api),
    watchClosed: watchClosed({ api, state })
  })

  watch(() => state.closed, api.watchClosed, { immediate: true })

  onMounted(() => {
    props.emitter.emit('TopBoxMounted', vm)
    api.bindEvent()
  })

  onBeforeUnmount(api.unBindEvent)

  return api
}
