export const handleClick = ({ emit, props, state }) => (node) => {
  if (!state.disabled) {
    state.value = node[props.valueField]
    emit('update:modelValue', state.value)
  }
}

export const moreNodeClick = ({ emit, props, state }) => (node) => {
  if (!state.disabled) {
    const index = state.moreData.indexOf(node)

    state.moreData.splice(index, 1, state.buttonData[state.buttonData.length - 1])
    state.buttonData.splice(state.buttonData.length - 1, 1, node)
    state.value = node[props.valueField]
    emit('update:modelValue', state.value)
  }
}
