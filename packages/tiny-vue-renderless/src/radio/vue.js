import {
  handleChange,
  isGroup,
  radioSize,
  isDisabled,
  tabIndex,
  getModel,
  setModel,
  toggleEvent
} from './index'

export const api = ['state', 'handleChange']

export const renderless = (
  props,
  { onMounted, onBeforeUnmount, computed, reactive, inject },
  { refs, parent, emit, constants, nextTick, dispatch }
) => {
  parent.tinyForm = parent.tinyForm || inject('form', null)

  const api = {}

  const state = reactive({
    focus: false,
    radioGroup: '',
    isGroup: computed(() => api.isGroup()),
    radioSize: computed(() => api.radioSize()),
    isDisabled: computed(() => api.isDisabled()),
    tabIndex: computed(() => api.tabIndex()),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    model: computed({
      get: () => api.getModel(),
      set: (val) => api.setModel(val)
    })
  })

  Object.assign(api, {
    state,
    radioSize: radioSize({ props, state }),
    getModel: getModel({ props, state }),
    isGroup: isGroup({ constants, parent, state }),
    tabIndex: tabIndex({ props, state }),
    isDisabled: isDisabled({ props, state }),
    setModel: setModel({ constants, dispatch, emit, props, refs, state }),
    handleChange: handleChange({ constants, dispatch, emit, state, nextTick })
  })

  onMounted(() => {
    dispatch('Tooltip', 'tooltip-update')
    toggleEvent({ props, refs, type: 'add' })
  })

  onBeforeUnmount(() => {
    toggleEvent({ props, refs, type: 'remove' })
  })

  return api
}
