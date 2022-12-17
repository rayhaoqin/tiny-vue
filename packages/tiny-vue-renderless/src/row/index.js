export const computedClassName = ({ flex, justify, align }) => {
  const className = []

  if (flex) {
    className.push('row-flex')
    className.push(`row-justify-${justify}`)
    className.push(`row-align-${align}`)
  }

  return className.join(' ')
}

export const computedStyle = (gutter) => {
  const value = gutter ? -(gutter / 2) : 0

  return value ? { marginLeft: value + 'px', marginRight: value + 'px' } : {}
}
