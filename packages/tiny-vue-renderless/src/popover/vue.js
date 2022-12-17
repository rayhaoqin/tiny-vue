import {
  mounted,
  computedTooltipId,
  destroyed,
  doToggle,
  doShow,
  doClose,
  handleFocus,
  handleClick,
  handleBlur,
  handleKeydown,
  handleAfterEnter,
  handleAfterLeave,
  handleMouseEnter,
  handleMouseLeave,
  handleDocumentClick,
  cleanup,
  wrapMounted
} from './index'
import userPopper from '@opentiny/vue-renderless/common/deps/vue-popper'

export const api = ['state', 'handleAfterEnter', 'handleAfterLeave']

const initState = ({ reactive, computed, api, popperElm, showPopper, referenceElm }) => {
  const state = reactive({
    popperElm,
    showPopper,
    timer: null,
    mounted: false,
    referenceElm,
    tooltipId: computed(() => api.computedTooltipId())
  })
  return state
}

const initApi = ({ api, props, state, refs, emit, doDestroy, constants }) => {
  Object.assign(api, {
    state,
    mounted: mounted({ api, state, constants, props }),
    cleanup: cleanup({ state, props }),
    destroyed: destroyed({ state, api }),
    doDestroy,
    computedTooltipId: computedTooltipId(constants),
    doShow: doShow(state),
    doClose: doClose(state),
    doToggle: doToggle(state),
    handleClick: handleClick(state),
    handleAfterEnter: handleAfterEnter(emit),
    handleBlur: handleBlur({ props, state }),
    handleFocus: handleFocus({ props, state }),
    handleKeydown: handleKeydown({ api, props }),
    handleMouseLeave: handleMouseLeave({ props, state }),
    handleAfterLeave: handleAfterLeave({ emit, api }),
    handleMouseEnter: handleMouseEnter({ props, state }),
    handleDocumentClick: handleDocumentClick({ refs, state }),
    wrapMounted: wrapMounted({ api, props, refs, state })
  })
}

const initWatch = ({ watch, props, state, emit }) => {
  watch(
    () => state.showPopper,
    (val) => {
      if (props.disabled) {
        return
      }

      val ? emit('show') : emit('hide')
    },
    { immediate: true }
  )
}

export const renderless = (
  props,
  { reactive, computed, watch, toRefs, onBeforeUnmount, onMounted, onUnmounted, onActivated, onDeactivated },
  { $prefix, emit, refs, slots, nextTick }
) => {
  const api = {}
  const constants = { IDPREFIX: `${$prefix.toLowerCase()}-popover` }
  const options = { emit, onBeforeUnmount, nextTick, reactive, props, watch, onDeactivated, refs, slots, toRefs }
  const { showPopper, popperElm, referenceElm, doDestroy } = userPopper(options)
  const state = initState({ reactive, computed, api, popperElm, showPopper, referenceElm })

  initApi({ api, constants, props, state, refs, emit, doDestroy })

  onDeactivated(() => {
    api.destroyed()
    api.cleanup()
  })

  // 注册生命周期函数必须要在（watch）异步函数/组件之前，否则会 Vue3 警告
  onMounted(api.wrapMounted)
  onActivated(api.mounted)
  onUnmounted(api.destroyed)
  onBeforeUnmount(api.cleanup)

  initWatch({ watch, props, state, emit })

  return api
}
