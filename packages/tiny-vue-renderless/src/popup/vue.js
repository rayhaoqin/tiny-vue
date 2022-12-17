import {
  getStyle,
  watchValue,
  open,
  opened,
  closed,
  onTouchMove,
  close,
  renderOverlay,
  clickOverlay,
  updateZIndex
} from './index'

export const api = ['state', 'open', 'close', 'clickOverlay', 'onTouchMove', 'opened', 'closed']

const initState = ({ reactive, computed, props, api }) => {
  const state = reactive({
    transitionName: computed(() =>
      props.transition || props.position === 'center' ? 'tiny-fade' : `tiny-popup-slide-${props.position}`
    ),
    style: computed(() => api.getStyle()),
    inited: computed(() => state.inited || props.modelValue),
    opened: false,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    direction: '',
    shouldRender: computed(() => state.inited || props.lazyRender),
    context: { zIndex: 2000, lockCount: 0, stack: [] },
    zIndex: props.zIndex,
    overlayStyle: computed(() => ({
      zIndex: state.zIndex,
      ...props.overlayStyle
    }))
  })

  return state
}

const initApi = ({ api, props, state, refs, emit, nextTick, constants }) => {
  Object.assign(api, {
    state,
    opened: opened(emit),
    closed: closed(emit),
    getStyle: getStyle(props),
    watchValue: watchValue(api),
    updateZIndex: updateZIndex({ refs, state }),
    clickOverlay: clickOverlay({ api, emit, props }),
    renderOverlay: renderOverlay({ api, nextTick, props, state }),
    onTouchMove: onTouchMove({ refs, state }),
    open: open({ api, constants, emit, props, state }),
    close: close({ api, constants, emit, props, state })
  })
}

export const renderless = (props, { computed, onMounted, reactive, watch, nextTick }, { constants, refs, emit }) => {
  const api = {}
  const state = initState({ reactive, computed, props, api })

  initApi({ api, props, state, refs, emit, nextTick, constants })

  watch(() => props.modelValue, api.watchValue, { immediate: true })

  onMounted(() => {
    props.modelValue && api.open()
  })

  return api
}
