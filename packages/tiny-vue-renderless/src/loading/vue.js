import { handleAfterLeave, setText, close } from './index'

export const api = ['state', 'handleAfterLeave', 'setText', 'close']

export const renderless = (props, { reactive }, { constants, vm, emit }) => {
  const state = reactive({
    text: null,
    spinner: null,
    visible: false,
    customClass: '',
    background: null,
    fullscreen: true,
    closed: false
  })

  const api = {
    state,
    setText: setText(state),
    handleAfterLeave: handleAfterLeave(emit),
    close: close({ state, constants, vm })
  }

  return api
}
