import {
  addToStore,
  handleChange,
  computedGetModelGet,
  computedGetModelSet,
  computedIsChecked,
  computedIsGroup,
  computedStore,
  computedIsLimitDisabled,
  computedIsDisabled,
  computedFormItemSize,
  computedCheckboxSize,
  mounted,
  toggleEvent
} from './index'

export const api = ['state', 'handleChange']

export const renderless = (props, { computed, onMounted, onBeforeUnmount, reactive, watch, inject }, { parent, emit, constants, nextTick, dispatch }) => {
  parent.tinyForm = parent.tinyForm || inject('form', null)
  const api = { dispatch }
  const state = reactive({
    ...{ focus: false, selfModel: false, isLimitExceeded: false },
    store: computed(() => api.computedStore()),
    isGroup: computed(() => api.computedIsGroup()),
    isChecked: computed(() => api.computedIsChecked()),
    isDisabled: computed(() => api.computedIsDisabled()),
    checkboxSize: computed(() => api.computedCheckboxSize()),
    isLimitDisabled: computed(() => api.computedIsLimitDisabled()),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    model: computed({ get: () => api.computedGetModelGet(), set: (value) => api.computedGetModelSet(value) })
  })
  Object.assign(api, {
    state,
    addToStore: addToStore({ state, props }),
    computedStore: computedStore({ state, props }),
    computedFormItemSize: computedFormItemSize(props),
    computedIsChecked: computedIsChecked({ state, props }),
    computedIsLimitDisabled: computedIsLimitDisabled(state),
    computedIsDisabled: computedIsDisabled({ state, props }),
    computedGetModelGet: computedGetModelGet({ state, props }),
    computedIsGroup: computedIsGroup({ state, parent, constants }),
    computedGetModelSet: computedGetModelSet({ state, dispatch, emit, constants })
  })
  const formItemSize = computed(() => api.computedFormItemSize())
  api.computedCheckboxSize = computedCheckboxSize({ state, props, formItemSize })
  Object.assign(api, {
    mounted: mounted({ emit, props, api, parent }),
    handleChange: handleChange({ state, props, emit, nextTick, dispatch: api.dispatch, constants })
  })

  watch(
    () => props.modelValue,
    (value) => props.validateEvent && api.dispatch(constants.FORM_ITEM, constants.FORM_CHANGE, value)
  )

  onBeforeUnmount(() => {
    toggleEvent({ parent, props, type: 'remove' })
  })

  onMounted(() => {
    dispatch('Tooltip', 'tooltip-update')
    toggleEvent({ parent, props, type: 'add' })
    api.mounted()
  })

  return api
}
