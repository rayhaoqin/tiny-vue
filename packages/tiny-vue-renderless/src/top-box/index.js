import { KEY_CODE } from '@opentiny/vue-renderless/common'
import { on, off } from '@opentiny/vue-renderless/common/deps/dom'
import PopupManager from '@opentiny/vue-renderless/common/deps/popup-manager'

export const handleAfterLeave = (api) => () => api.destroy()

export const destroy = (parent) => () => {
  parent.$el.parentNode.removeChild(parent.$el)
}

export const bindKeyDown = ({ api, state }) => (event) => {
  if (event.keyCode === KEY_CODE.Escape) {
    !state.closed && api.close()
  }
}

export const bindEvent = ({ api }) => () => on(document, 'keydown', api.bindKeyDown)

export const unBindEvent = ({ api }) => () => off(document, 'keydown', api.bindKeyDown)

export const startTimer = ({ api, state }) => () => {
  if (state.duration > 0) {
    state.timer = setTimeout(() => {
      !state.closed && api.close()
    }, state.duration)
  }
}

export const clearTimer = (state) => () => clearTimeout(state.timer)

export const close = (state) => () => {
  state.closed = true
  typeof state.onClose === 'function' && state.onClose(state)
}

export const watchClosed = ({ state }) => (value) => value && (state.visible = false)

export const getZindex = () => PopupManager.nextZIndex()

export const getTypeClass = ({ constants, state }) => () => {
  const typeClass = constants[(state.type || '').toUpperCase()]
  return state.type && !state.iconClass && typeClass ? `${typeClass}` : ''
}

export const getOffsetStyle = ({ state }) => () => ({ top: `${state.verticalOffset}px` })
