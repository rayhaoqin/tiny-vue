export const handleClose = (emit) => (event) => {
  event.stopPropagation()
  emit('close', event)
}

export const handleClick = ({ emit, parent }) => (event) => {
  parent.$parent && parent.$parent.tagSelectable && event.stopPropagation()
  emit('click', event)
}
