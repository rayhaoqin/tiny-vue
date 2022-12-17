import {
  handleChange,
  getValue,
  setValue,
  getGroup,
  getStyle,
  toggleEvents
} from './index'

export const api = ['state', 'handleChange']

export const renderless = (
  props,
  { computed, reactive, onMounted, onBeforeUnmount },
  { emit, parent, dispatch, constants, nextTick, refs }
) => {
  const api = {
    getGroup: getGroup({ constants, parent }),
    toggleEvents: toggleEvents({ refs, props })
  }

  const state = reactive({
    focus: false,
    value: computed({
      get: () => api.getValue(),
      set: (val) => api.setValue(val)
    }),
    radioGroup: computed(() => api.getGroup()),
    activeStyle: computed(() => api.getStyle()),
    size: computed(() => state.radioGroup.state.radioGroupSize),
    isDisabled: computed(() => props.disabled || state.radioGroup.disabled),
    tabIndex: computed(() =>
      state.isDisabled || (state.radioGroup && state.value !== props.label)
        ? -1
        : 0
    )
  })
  Object.assign(api, {
    state,
    getValue: getValue(state),
    getStyle: getStyle(state),
    setValue: setValue({ emit, state }),
    handleChange: handleChange({ constants, dispatch, nextTick, state })
  })

  onMounted(api.toggleEvents)

  onBeforeUnmount(() => {
    api.toggleEvents(true)
  })

  return api
}
