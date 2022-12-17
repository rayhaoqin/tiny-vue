export const handleClick = (state) => (name) => {
  state.rootTabs.setCurrentName(name)
  state.hide = true
}

export const setDropdownTabs = (state) => (data) => {
  state.dropdownTabs = data
}
