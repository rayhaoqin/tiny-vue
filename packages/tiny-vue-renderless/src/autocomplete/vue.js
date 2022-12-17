import debounce from '@opentiny/vue-renderless/common/deps/debounce'
import userPopper from '@opentiny/vue-renderless/common/deps/vue-popper'
import { guid } from '@opentiny/vue-renderless/common/string'
import {
  computedVisible,
  watchVisible,
  mounted,
  getData,
  handleChange,
  handleFocus,
  handleBlur,
  handleClear,
  close,
  handleKeyEnter,
  select,
  highlight
} from './index'

export const api = [
  'state',
  'select',
  'suggestionState',
  'getInput',
  'handleChange',
  'close',
  'handleFocus',
  'handleBlur',
  'handleClear',
  'handleKeyEnter',
  'highlight',
  'select',
  'doDestroy'
]

const initState = ({ reactive, $prefix, computed }) => {
  const state = reactive({
    activated: false,
    suggestions: [],
    loading: false,
    highlightedIndex: -1,
    suggestionDisabled: false,
    id: $prefix + '-' + guid(),
    suggestionVisible: computed(() => computedVisible(state))
  })

  return state
}

const initSuggestionState = ({ reactive, parent, showPopper, popperElm, referenceElm }) => {
  return reactive({
    parent,
    dropdownWidth: '',
    showPopper,
    popperElm,
    referenceElm
  })
}

const initApi = ({ api, state, doDestroy, suggestionState, emit, refs, props, updatePopper, nextTick, constants }) => {
  api.getData = getData({ props, state, updatePopper, nextTick })

  Object.assign(api, {
    state,
    doDestroy,
    suggestionState,
    close: close(state),
    handleBlur: handleBlur({ emit, state }),
    mounted: mounted({ refs, state, suggestionState }),
    highlight: highlight({ constants, refs, state }),
    handleClear: handleClear({ emit, state }),
    select: select({ emit, nextTick, props, state }),
    watchVisible: watchVisible({ suggestionState, refs }),
    handleChange: handleChange({ api, emit, state, props }),
    handleFocus: handleFocus({ api, emit, props, state }),
    handleKeyEnter: handleKeyEnter({ api, emit, nextTick, props, state }),
    debouncedGetData: debounce(props.debounce, api.getData)
  })
}

export const renderless = (
  props,
  { computed, onBeforeUnmount, onMounted, reactive, watch, toRefs, onDeactivated },
  { $prefix, refs, parent, emit, constants, nextTick, slots }
) => {
  const api = {}
  const state = initState({ reactive, $prefix, computed })

  const { showPopper, popperElm, referenceElm, doDestroy, updatePopper } = userPopper({
    reactive,
    watch,
    refs,
    emit,
    slots,
    nextTick,
    props,
    onBeforeUnmount,
    toRefs,
    onDeactivated
  })

  const suggestionState = initSuggestionState({ reactive, parent, showPopper, popperElm, referenceElm })

  initApi({ api, state, doDestroy, suggestionState, emit, refs, props, updatePopper, nextTick, constants })

  watch(() => state.suggestionVisible, api.watchVisible)

  onMounted(api.mounted)

  return api
}
