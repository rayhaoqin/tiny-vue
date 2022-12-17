import { computedWidth, watchValue, mounted, onFocus, onBlur, onInput, separteText, jointText } from './index'

export const api = ['state', 'onFocus', 'onBlur', 'onInput']

export const renderless = (props, { computed, onMounted, reactive, watch }, { emit, nextTick, refs }) => {
  const api = {}
  const state = reactive({
    type: 'input',
    textAreaValue: '',
    text: null,
    popup: null,
    width: computed(() => api.computedWidth())
  })

  Object.assign(api, {
    state,
    jointText,
    separteText,
    computedWidth: computedWidth({ props }),
    mounted: mounted({ props, refs, state }),
    onInput: onInput({ api, emit, props }),
    watchValue: watchValue({ api, props, state }),
    onBlur: onBlur({ api, emit, props, state }),
    onFocus: onFocus({ api, emit, props, nextTick, state })
  })

  watch(() => props.modelValue, api.watchValue, { immediate: true })

  onMounted(api.mounted)

  return api
}
