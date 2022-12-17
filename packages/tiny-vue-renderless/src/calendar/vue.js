import {
  computedCalendar,
  computedEventList,
  toggeModel,
  selectMonth,
  selectDay,
  getEventByDay,
  getEventByMonth,
  getTime,
  getYearList,
  isToday,
  isThisMonth,
  genMonths,
  toToday,
  getCurrentDate
} from './index'

export const api = [
  'state',
  'renderProxy',
  'isToday',
  'isThisMonth',
  'getEventByMonth',
  'getEventByDay',
  'selectDay',
  'selectMonth',
  'toggeModel',
  'getTime',
  'genMonths',
  'toToday'
]

const initState = ({ reactive, props, computed, api }) => {
  const state = reactive({
    index: 0,
    selectedTip: '',
    selectedDate: getCurrentDate(),
    showYear: false,
    showMonth: false,
    activeYear: props.year,
    displayMode: props.mode,
    activeMonth: props.month,
    dropdownYear: computed(() => api.getYearList()),
    calendar: computed(() => api.computedCalendar()),
    eventList: computed(() => api.computedEventList())
  })

  return state
}

const initWatch = ({ watch, props, state, emit }) => {
  watch(
    () => props.year,
    (value, oldValue) => {
      if (value !== oldValue) {
        state.activeYear = value
      }
    },
    { immediate: true }
  )

  watch(
    () => props.month,
    (value, oldValue) => {
      if (value !== oldValue) {
        state.activeMonth = value
      }
    },
    { immediate: true }
  )

  watch(
    () => state.activeYear,
    (value, oldValue) => {
      if (value !== oldValue) {
        emit('year-change', value, oldValue)
        emit('update:modelValue', value, oldValue) // 兼容以前的写法
      }
    }
  )

  watch(
    () => state.activeMonth,
    (value, oldValue) => {
      if (value !== oldValue) {
        emit('month-change', value, oldValue)
      }
    }
  )
}

const initApi = ({ api, state, t, props }) => {
  Object.assign(api, {
    state,
    genMonths,
    computedCalendar: computedCalendar({ state }),
    computedEventList: computedEventList({ props, state }),
    getTime: getTime(state),
    isToday: isToday(state),
    selectDay: selectDay(state),
    getYearList: getYearList(t),
    toggeModel: toggeModel(state),
    selectMonth: selectMonth(state),
    isThisMonth: isThisMonth(state),
    getEventByDay: getEventByDay(state),
    getEventByMonth: getEventByMonth({ props, state }),
    toToday: toToday(state)
  })
}

export const renderless = (props, { computed, reactive, watch }, { t, emit }) => {
  const api = {}
  const state = initState({ reactive, props, computed, api })

  initWatch({ watch, props, state, emit })
  initApi({ api, state, t, props })

  return api
}
