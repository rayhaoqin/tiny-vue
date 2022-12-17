export const visibleHandle = (emit) => () => {
  emit('update:visible', false)
  emit('close', false)
}

export const watchVisible = ({ emit, props, state }) => (value) => {
  state.active = props.modelValue

  setTimeout(() => {
    value ? (state.toggle = true) : (state.toggle = false)
  }, 0)

  emit('update:visible', value)
}

export const menuHandle = ({ emit, state }) => (item) => {
  state.active = item.id

  emit('update:visible', false)
  emit('update:modelValue', item.id)
  emit('click', item)
}
