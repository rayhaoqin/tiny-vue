import { handleClick, setDropdownTabs } from './index'

export const api = ['state', 'handleClick', ' setDropdownTabs']

export const renderless = (props, { inject, reactive }) => {
  const state = reactive({
    hide: true,
    dropdownTabs: props.tabs || [],
    rootTabs: inject('rootTabs')
  })

  const api = {
    state,
    handleClick: handleClick(state),
    setDropdownTabs: setDropdownTabs(state)
  }

  return api
}
