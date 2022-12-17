import { computedBarStyle } from './index'

export const api = ['state', 'computedBarStyle']

export const renderless = (props, { inject, reactive }, { parent }) => {
  const state = reactive({
    rootTabs: inject('rootTabs'),
    barStyle: {}
  })

  const api = {
    state,
    computedBarStyle: computedBarStyle(parent)
  }

  return api
}
