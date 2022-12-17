import {
  clear,
  handleChange,
  showSelector,
  changeKey,
  searchClick,
  clickOutside,
  beforeDestroy,
  mounted,
  formatSearchTypes,
  setDefaultType,
  searchEnterKey
} from './index'

export const api = [
  'state',
  'handleChange',
  'showSelector',
  'changeKey',
  'searchClick',
  'searchEnterKey',
  'inputStyle',
  'formatSearchTypes',
  'setDefaultType',
  'clear'
]

export const useFormatSearchTypes = ({
  computed,
  props,
  reactive,
  toRefs,
  watch
}) => {
  const api = {
    setDefaultType,
    formatSearchTypes
  }

  const state = reactive({
    searchValue: {},
    types: computed(() => api.formatSearchTypes(props.searchTypes))
  })

  watch(
    () => props.searchTypes,
    () => {
      state.searchValue = api.setDefaultType(props.searchTypes)
    },
    { immediate: true }
  )

  return {
    api,
    state: toRefs(state)
  }
}

export const renderless = (
  props,
  { computed, onBeforeUnmount, onMounted, reactive, toRefs, watch },
  { refs, parent, emit, nextTick }
) => {
  const formatSearchTypes = useFormatSearchTypes({
    computed,
    props,
    reactive,
    toRefs,
    watch
  })

  const state = reactive({
    show: false,
    focus: false,
    hovering: false,
    collapse: props.mini,
    currentValue: props.modelValue,
    ...formatSearchTypes.state,
    showClear: computed(
      () =>
        props.clearable && (state.focus || state.hovering) && state.currentValue
    )
  })

  const api = {
    state,
    clear: clear({ emit, refs, state }),
    changeKey: changeKey({ state, emit }),
    handleChange: handleChange({ emit, state, props }),
    showSelector: showSelector({ refs, state }),
    searchClick: searchClick({ emit, props, state }),
    clickOutside: clickOutside({ parent, props, state }),
    ...formatSearchTypes.api
  }

  Object.assign(api, {
    searchEnterKey: searchEnterKey({ api, props, refs, nextTick })
  })

  onMounted(mounted(api))
  onBeforeUnmount(beforeDestroy(api))

  watch(
    () => props.modelValue,
    (value) => (state.currentValue = value)
  )

  return api
}
