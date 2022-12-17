import {
  getRows,
  getMonthTimestamp,
  markRange,
  watchDate,
  handleMouseMove,
  handleMonthTableClick,
  cellMatchesDate,
  getCellStyle,
  getMonthOfCell
} from './index'
import { DATEPICKER } from '@opentiny/vue-renderless/common'

export const api = ['state', 'handleMonthTableClick', 'handleMouseMove', 'getCellStyle']

export const renderless = (props, { computed, reactive, watch }, { t, vm, emit }) => {
  const api = {}
  const { MonhtList } = DATEPICKER
  const state = reactive({
    months: MonhtList,
    tableRows: [[], [], []],
    lastRow: null,
    lastColumn: null,
    rows: computed(() => api.getRows())
  })

  Object.assign(api, {
    t,
    state,
    getMonthOfCell: getMonthOfCell(props),
    cellMatchesDate: cellMatchesDate(props),
    markRange: markRange({ api, props, state }),
    watchDate: watchDate({ api, props }),
    getMonthTimestamp: getMonthTimestamp(api),
    handleMouseMove: handleMouseMove({ api, emit, props, state }),
    handleMonthTableClick: handleMonthTableClick({ api, emit, props }),
    getCellStyle: getCellStyle({ api, props }),
    getRows: getRows({ props, state, vm })
  })

  watch(
    () => props.rangeState,
    (value) => api.markRange(props.minDate, value.endDate),
    { deep: true }
  )

  watch(() => props.minDate, api.watchDate)

  watch(() => props.maxDate, api.watchDate)

  return api
}
