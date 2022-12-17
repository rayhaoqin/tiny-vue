import {
  toggle,
  computedWarpClasses,
  computedInnerClasses,
  computedStyle
} from './index'

export const api = ['toggle', 'state']

export const renderless = (
  props,
  { computed, watch, reactive, inject },
  { parent, constants, mode, emit }
) => {
  const prefixCls = constants.prefixcls(mode)

  parent.tinyForm = parent.tinyForm || inject('form', null)

  const api = {
    computedInnerClasses: computedInnerClasses({ prefixCls })
  }

  const state = reactive({
    currentValue: props.modelValue,
    innerClasses: computed(() => api.computedInnerClasses()),
    wrapClasses: computed(() => api.computedWarpClasses()),
    style: computed(() => api.computedStyle()),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    disabled: computed(() => props.disabled || state.formDisabled)
  })

  Object.assign(api, {
    state,
    computedStyle: computedStyle({ props, state }),
    computedWarpClasses: computedWarpClasses({ prefixCls, props, state }),
    toggle: toggle({ emit, props, state })
  })

  watch(
    () => props.modelValue,
    (value) => {
      state.currentValue = value
    },
    { immediate: true }
  )

  return api
}
