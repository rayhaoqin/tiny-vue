import { KEY_CODE } from '@opentiny/vue-renderless/common'
import { on, off } from '@opentiny/vue-renderless/common/deps/dom'
import PopupManager from '@opentiny/vue-renderless/common/deps/popup-manager'

export const startTimer = ({ api, state }) => () => {
  if (state.duration > 0) {
    state.timer = setTimeout(() => {
      !state.closed && api.close()
    }, state.duration)
  }
}

export const clearTimer = (state) => () => {
  clearTimeout(state.timer)
  state.timer = null
}

export const click = ({ emit, state }) => () => {
  typeof state.onClick === 'function' && this.onClick()
  emit('click', '')
}

export const close = ({ state, props }) => () => {
  if (!props.beforeClose || (typeof props.beforeClose === 'function' && props.beforeClose())) {
    typeof props.onClose === 'function' && props.onClose()
    state.closed = true
  }
}

export const watchClosed = (state) => (value) => {
  if (value) {
    state.visible = false
  }
}

export const getTypeClass = (constants) => (state) =>
  state.type && constants[state.type.toUpperCase()] ? `icon-${constants[state.type]}` : ''

export const getOffsetStyle = (state) => {
  const side = {}

  side[state.verticalProperty] = `${state.verticalOffset}px`

  return side
}

export const getZindex = () => PopupManager.nextZIndex()

export const getPositionSide = (state) => (/^top-/.test(state.position) ? 'top' : 'bottom')

export const bindKeyDown = ({ api, state }) => (event) => {
  if (event.keyCode === KEY_CODE.Delete || event.keyCode === KEY_CODE.Backspace) {
    api.clearTimer()
  } else if (event.keyCode === KEY_CODE.Escape) {
    !state.closed && api.close()
  } else {
    api.startTimer()
  }
}

export const bindEvent = ({ api, state }) => () => {
  if (state.timer) {
    api.clearTimer()
  }

  api.startTimer()

  on(document, 'keydown', api.bindKeyDown)
}

export const unBindEvent = (api) => () => off(document, 'keydown', api.bindKeyDown)
