import { emitEvent } from '@opentiny/vue-renderless/common/event'

export const toggle = ({ api, state }) => () => {
  state.isShow ? api.collapse() : api.expand()
}

export const expand = ({ emit, state }) => () => {
  if (!emitEvent(emit, 'before-expand')) {
    return
  }

  state.isShow = true

  emit('expand', true)
}

export const collapse = ({ emit, state }) => () => {
  if (!emitEvent(emit, 'before-collapse')) {
    return
  }

  state.isShow = false

  emit('collapse', false)
}
