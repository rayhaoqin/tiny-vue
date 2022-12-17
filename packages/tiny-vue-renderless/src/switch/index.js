import { isNull } from '@opentiny/vue-renderless/common/type'

export const toggle = ({ emit, props, state }) => (event) => {
  event.preventDefault()

  if (state.disabled) {
    return false
  }

  state.currentValue =
    state.currentValue === props.trueValue ? props.falseValue : props.trueValue

  emit('update:modelValue', state.currentValue)
  emit('change', state.currentValue)
}

export const computedWarpClasses = ({ prefixCls, props, state }) => () => {
  return [
    `${prefixCls}`,
    {
      [`${prefixCls}-checked`]: state.currentValue === props.trueValue,
      [`${prefixCls}-disabled`]: state.disabled,
      mini: props.mini,
      disabled: state.disabled
    }
  ]
}

export const computedInnerClasses = ({ prefixCls }) => () =>
  `${prefixCls}-inner`

export const computedStyle = ({ props, state }) => () => {
  let size = ''

  if (!isNull(props.modelValue)) {
    size =
      typeof props.modelValue === 'number'
        ? `${props.modelValue}px`
        : props.modelValue
  }

  return {
    fontSize: size,
    backgroundColor:
      props.trueValue === state.currentValue
        ? props.activeColor
        : props.inactiveColor
  }
}
