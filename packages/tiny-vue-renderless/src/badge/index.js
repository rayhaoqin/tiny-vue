export const computedContent = ({ props, state }) => () => {
  return typeof state.valueRef === 'number' && typeof props.max === 'number'
    ? props.max < state.valueRef
      ? `${props.max}+`
      : state.valueRef
    : state.valueRef
}

export const computedValueRef = ({ props }) => () => {
  if (typeof props.value === 'number') {
    return props.value
  }

  return typeof props.modelValue === 'number' ? props.modelValue : undefined
}
