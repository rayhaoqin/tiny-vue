export const handleError = ({ props, state }) => () => {
  const { error } = props
  const errorFlag = error ? error() : undefined

  if (errorFlag !== false) {
    state.isImageExist = false
  }
}

export const computedAvatarClass = (contants) => (props) => {
  const { size, icon, shape } = props
  let classList = [contants.COMPONENT_PREFIX]

  if (size && typeof size === 'string') {
    classList.push(`${contants.COMPONENT_PREFIX}--${size}`)
  }

  if (icon) {
    classList.push(`${contants.COMPONENT_PREFIX}--${contants.icon}`)
  }

  if (shape) {
    classList.push(`${contants.COMPONENT_PREFIX}--${shape}`)
  }

  return classList.join(' ')
}
