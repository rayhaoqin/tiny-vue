import { setActiveNames, handleItemClick } from './index'

export const api = ['state']

export const renderless = (props, { reactive, watch }, { parent, emit, constants }) => {
  const eventName = constants.EVENT_NAME.CollapseItemClick

  const state = reactive({
    activeNames: []
  })

  const api = {
    state,
    setActiveNames: setActiveNames({ emit, props, state })
  }

  api.handleItemClick = handleItemClick({ api, props, state })

  watch(
    () => props.modelValue,
    (value) => {
      state.activeNames = value || value === 0 ? [].concat(value) : []
    },
    { immediate: true }
  )

  parent.$on(eventName, api.handleItemClick)

  return api
}
