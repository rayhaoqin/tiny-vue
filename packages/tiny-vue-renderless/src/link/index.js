export const handleClick = ({ emit, props, state }) => (event) => {
  if (!state.disabled && !props.href) {
    emit('click', event)
  }
}
