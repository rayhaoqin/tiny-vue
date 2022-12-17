import { mountedHandler, beforeUnmountHandler, watchModelValue, onTouchstart, onTouchmove, onTouchend } from './index'

export const api = ['state']

export const renderless = (props, { computed, onMounted, reactive, watch, onBeforeUnmount }, { refs, emit }) => {
  const api = {}
  const state = reactive({
    replaces: '',
    styleObj: {},
    translate3d: 0,
    draggposition: 0,
    value: props.modelValue,
    checkStatus: false,
    headHeight: props.headHeight,
    pullingText: props.pullingText,
    loosingText: props.loosingText,
    successText: props.successText,
    successDuration: props.successDuration,
    animationDuration: props.animationDuration,
    disabled: computed(() => props.disabled)
  })

  Object.assign(api, {
    state,
    onTouchstart: onTouchstart({ state }),
    onTouchmove: onTouchmove({ refs, state }),
    onTouchend: onTouchend({ emit, props, state }),
    mountedHandler: mountedHandler({ api, refs, state }),
    beforeUnmountHandler: beforeUnmountHandler({ api, refs })
  })

  watch(
    () => props.modelValue,
    (value) => {
      watchModelValue({ value, state })
    }
  )

  onMounted(api.mountedHandler)
  onBeforeUnmount(api.beforeUnmountHandler)

  return api
}
