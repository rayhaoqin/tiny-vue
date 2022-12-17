import { collapse, expand, toggle } from './index'

export const api = ['state', 'toggle']

export const renderless = (props, { reactive }, { emit }) => {
  const api = {}
  const state = reactive({
    isShow: props.expand
  })

  Object.assign(api, {
    state,
    collapse: collapse({ emit, state }),
    expand: expand({ emit, state }),
    toggle: toggle({ api, state })
  })

  return api
}
