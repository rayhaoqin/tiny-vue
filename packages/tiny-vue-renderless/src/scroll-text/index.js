export const computedBindStyle = ({ constants, time }) => ({
  [constants.ANIMATION_DURATION]: parseInt(time, 10) + 's'
})

export const stopAnimation = ({ props, state }) => () => {
  if (props.hoverStop) {
    state.isStop = true
  }
}

export const startAnimation = ({ props, state }) => () => {
  if (props.hoverStop) {
    state.isStop = false
  }
}
