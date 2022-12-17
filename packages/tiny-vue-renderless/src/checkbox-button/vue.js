import {
  handleChange,
  computedGetModelGet,
  computedGetModelSet,
  computedCheckboxGroup,
  computedActiveStyle,
  computedFormItemSize,
  computedSize,
  computedIsDisabled,
  toggleEvent
} from './index'
import { addToStore, computedIsChecked, computedStore, computedIsLimitDisabled } from '@opentiny/vue-renderless/checkbox'

export const api = ['state', 'handleChange']

const initState = ({ reactive, computed, api }) => {
  const state = reactive({
    focus: false,
    selfModel: false,
    isLimitExceeded: false,
    model: computed({
      get: () => api.computedGetModelGet(),
      set: (value) => api.computedGetModelSet(value)
    }),
    size: computed(() => api.computedSize()),
    store: computed(() => api.computedStore()),
    isChecked: computed(() => api.computedIsChecked()),
    isDisabled: computed(() => api.computedIsDisabled()),
    activeStyle: computed(() => api.computedActiveStyle()),
    checkboxGroup: computed(() => api.computedCheckboxGroup()),
    isLimitDisabled: computed(() => api.computedIsLimitDisabled())
  })

  return state
}

const initApi = ({ api, state, props, formItemSize, parent, constants, emit, nextTick, dispatch }) => {
  Object.assign(api, {
    state,
    addToStore: addToStore({ state, props }),
    computedStore: computedStore({ state, props }),
    computedActiveStyle: computedActiveStyle(state),
    computedFormItemSize: computedFormItemSize(props),
    computedSize: computedSize({ state, formItemSize }),
    computedIsChecked: computedIsChecked({ state, props }),
    computedIsLimitDisabled: computedIsLimitDisabled(state),
    computedIsDisabled: computedIsDisabled({ state, props }),
    computedGetModelGet: computedGetModelGet({ state, props }),
    computedCheckboxGroup: computedCheckboxGroup({ parent, constants }),
    handleChange: handleChange({ state, props, emit, nextTick, dispatch, constants }),
    computedGetModelSet: computedGetModelSet({ state, props, emit, dispatch, constants })
  })
}

export const renderless = (
  props,
  { computed, onMounted, onBeforeUnmount, reactive },
  { parent, emit, dispatch, constants, nextTick }
) => {
  const api = {}
  const formItemSize = computed(() => api.computedFormItemSize())
  const state = initState({ reactive, computed, api })

  initApi({ api, state, props, formItemSize, parent, constants, emit, nextTick, dispatch })

  onBeforeUnmount(() => {
    toggleEvent({ parent, props, type: 'remove' })
  })

  onMounted(() => {
    toggleEvent({ parent, props, type: 'add' })

    props.checked && api.addToStore()
  })

  return api
}
