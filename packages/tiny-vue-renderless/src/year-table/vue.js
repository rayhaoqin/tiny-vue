import { getCellStyle, handleYearTableClick } from './index'

export const api = ['state', 'handleYearTableClick', 'getCellStyle']

export const renderless = (props, { computed, reactive }, { emit }) => {
  const api = {}
  const state = reactive({
    startYear: computed(() => Math.floor(props.date.getFullYear() / 10) * 10)
  })

  Object.assign(api, {
    state,
    getCellStyle: getCellStyle({ props }),
    handleYearTableClick: handleYearTableClick({ emit })
  })

  return api
}
