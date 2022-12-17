export const computedStyle = ({ state, props }) => () => {
  return {
    fill: props.color,
    color: props.color,
    backgroundColor: props.backgroundColor,
    backgroundImage: /^(image)$/.test(props.type) && state.internalValue ? `url(${state.internalValue})` : 'none'
  }
}

export const computedMessage = ({ props }) => () => {
  let result = ''
  const total = Math.floor(props.messageTotal)

  if (props.messageType === 'details' && !isNaN(total) && total > 0) {
    result = total

    if (props.messageUpperLimit && total > props.messageUpperLimit) {
      result = `${props.messageUpperLimit}+`
    }
  }

  return result
}

export const computedFontSize = ({ props, state }) => () => {
  let fontSize = ''

  if (props.type === 'label' && state.label && !props.min) {
    const length = state.label.length
    const sizeMap = {
      1: '40px',
      2: '30px',
      3: '22px',
      4: '20px',
      5: '18px',
      6: '16px'
    }

    fontSize = sizeMap[length]
  }

  return { fontSize }
}

export const computedLabel = ({ state, props }) => () => (props.min ? state.internalValue.substr(0, 2) : state.internalValue.substr(0, 6))

export const getInternalValue = ({ props }) => () => {
  if (props.modelValue === null) {
    let result = ''

    if (props.type === 'icon') {
      result = 'icon-user'
    } else if (props.type === 'label') {
      result = 'U'
    }

    return result
  } else {
    return props.modelValue
  }
}
