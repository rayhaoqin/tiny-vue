export const setActiveItem = ({ props, state }) => () => {
  state.children.forEach((item, index) => {
    item.state ? (item.state.index = index) : (item.index = index)
    item.state &&
      (item.state.active = (item.name || index) === props.modelValue)
  })
}

export const onChange = ({ emit, props }) => (active) => {
  if (active !== props.modelValue) {
    emit('update:modelValue', active)
    emit('change', active)
  }
}

export const getChildrens = ({ childrenHandler }) => () => {
  const $children = []

  childrenHandler(({ options, vm }) => {
    options.componentName === 'TinyTabbarItem' && $children.push(vm)
  })

  return $children
}
