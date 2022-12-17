const MIN_DISTANCE = 10

function getDirection(w, h) {
  if (h > w && h > MIN_DISTANCE) {
    return 'vertical'
  } else if (w > h && w > MIN_DISTANCE) {
    return 'horizontal'
  }
  return ''
}

export const resetTouchStatus = (state) => {
  state.direction = ''
  state.deltaX = 0
  state.deltaY = 0
  state.offsetX = 0
  state.offsetY = 0
}

export const touchStart = (state) => (event) => {
  resetTouchStatus(state)

  state.startX = event.touches[0].clientX
  state.startY = event.touches[0].clientY
}

export const touchMove = (state) => (event) => {
  const touch = event.touches[0]

  state.deltaX = touch.clientX - state.startX
  state.deltaY = touch.clientY - state.startY
  state.offsetX = Math.abs(state.deltaX)
  state.offsetY = Math.abs(state.deltaY)

  state.direction = state.direction || getDirection(state.offsetX, state.offsetY)
}
