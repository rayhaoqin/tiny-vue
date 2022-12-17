import {
  getBoundary,
  clearDisplayValue,
  showPickerAndlockSrcoll,
  hookMounted,
  getMonthEndDay,
  getDisplayValue,
  getRanges,
  onConfirm,
  onCancel,
  getOrigiCol,
  getColumns,
  updateInnerValue,
  formatValue,
  onChange,
  updateColumnValue
} from './index'
import { DATE } from '../common'

export const api = ['state', 'clearDisplayValue', 'showPickerAndlockSrcoll', 'hookMounted', 'onConfirm', 'onCancel', 'onChange']

const setWatchFn = ({ api, watch, props, state, emit }) => {
  watch(
    () => props.minDate,
    () => api.updateInnerValue(),
    {
      lazy: true
    }
  )
  watch(
    () => props.visible,
    (value) => (state.visible = value),
    { lazy: true }
  )
  watch(
    () => props.maxDate,
    () => api.updateInnerValue(),
    {
      lazy: true
    }
  )
  watch(
    () => props.modelValue,
    (value) => {
      if (value) {
        const val = api.formatValue(new Date(value))
        if (val.valueOf() !== state.innerValue.valueOf()) {
          state.innerValue = val
        }
        state.displayValue = api.getDisplayValue()
      }
    },
    {
      immediate: true
    }
  )
  watch(
    () => state.columns,
    () => api.updateColumnValue(),
    {
      lazy: true
    }
  )
  watch(
    () => state.innerValue,
    (value) => emit('input', value),
    {
      lazy: true
    }
  )
}

export const renderless = (props, context, { computed, onMounted, reactive, watch }, { constants, emit, nextTick, refs, parent }) => {
  const api = { formatValue: formatValue(props), getMonthEndDay: getMonthEndDay(constants), hookMounted: hookMounted({ constants, parent, refs, nextTick }) }

  const state = reactive({
    visible: false,
    innerValue: formatValue(props)(props.modelValue),
    ranges: computed(() => api.getRanges()),
    originColumns: computed(() => api.getOrigiCol()),
    columns: computed(() => api.getColumns()),
    displayValue: '',
    isReadonly: false,
    clearable: props.clearable
  })

  Object.assign(api, {
    state,
    getOrigiCol: getOrigiCol(state),
    onCancel: onCancel({ emit, state }),
    getColumns: getColumns({ props, state }),
    clearDisplayValue: clearDisplayValue(state),
    getDisplayValue: getDisplayValue({ constants, DATE, props, state }),
    showPickerAndlockSrcoll: showPickerAndlockSrcoll({ constants, state }),
    updateColumnValue: updateColumnValue({ constants, nextTick, props, refs, state })
  })

  api.getBoundary = getBoundary({ api, constants, props })
  api.updateInnerValue = updateInnerValue({ api, constants, props, refs, state })
  api.getRanges = getRanges({ api, constants, props, state })

  setWatchFn({ api, watch, props, state, emit })

  onMounted(() => {
    api.updateColumnValue()

    nextTick(() => {
      api.updateInnerValue()
    })
  })

  return Object.assign(api, {
    onConfirm: onConfirm({ api, emit, state }),
    onChange: onChange({ api, emit, refs, nextTick })
  })
}
