import {
  changeSelectionRange,
  adjustSpinners,
  isValidValue,
  handleKeydown,
  watchValue,
  watchVisible,
  handleCancel,
  handleChange,
  setSelectionRange,
  handleConfirm
} from './index'
import { compuAmPmMode } from '@opentiny/vue-renderless/time-range'
import { isDate } from '@opentiny/vue-renderless/common/deps/date-util'

export const api = ['state', 'handleChange', 'setSelectionRange', 'handleCancel', 'handleConfirm', 'adjustSpinners']

const initState = ({ reactive, props, computed, api }) => {
  const state = reactive({
    popperClass: '',
    format: 'HH:mm:ss',
    value: '',
    defaultValue: null,
    date: props.value || new Date(),
    oldValue: new Date(),
    selectableRange: [],
    selectionRange: [0, 2],
    disabled: false,
    arrowControl: false,
    visible: false,
    needInitAdjust: true,
    showSeconds: computed(() => (state.format || '').indexOf('ss') !== -1),
    useArrow: computed(() => state.arrowControl || props.timeArrowControl || false),
    amPmMode: computed(() => api.compuAmPmMode())
  })

  return state
}

export const renderless = (props, { computed, onMounted, reactive, watch, nextTick }, { t, emit: $emit, refs }) => {
  const api = {}
  const emit = props.emitter ? props.emitter.emit : $emit
  const state = initState({ reactive, props, computed, api })

  Object.assign(api, {
    t,
    state,
    compuAmPmMode: compuAmPmMode(state),
    adjustSpinners: adjustSpinners(refs),
    handleCancel: handleCancel({ state, emit }),
    setSelectionRange: setSelectionRange({ state, emit }),
    watchVisible: watchVisible({ nextTick, refs, state }),
    isValidValue: isValidValue({ state }),
    changeSelectionRange: changeSelectionRange({ refs, state }),
    handleConfirm: handleConfirm({ state, emit }),
    handleKeydown: handleKeydown({ api, refs }),
    handleChange: handleChange({ api, emit, state }),
    watchValue: watchValue({ api, emit, nextTick, state })
  })

  watch(() => state.value, api.watchValue)

  watch(
    () => props.show,
    (value) => {
      state.visible = value
    },
    { immediate: true }
  )

  watch(
    () => state.selectableRange,
    (value) => (refs.spinner.state.selectableRange = value)
  )

  watch(
    () => state.defaultValue,
    (value) => !isDate(state.value) && (state.date = value ? new Date(value) : new Date())
  )

  onMounted(() => {
    api.handleConfirm(true, true)
  })

  watch(() => state.visible, api.watchVisible)

  return api
}
