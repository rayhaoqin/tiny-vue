import afterLeave from '@opentiny/vue-renderless/common/deps/after-leave'
import { removeClass } from '@opentiny/vue-renderless/common/deps/dom'

export const handleAfterLeave = (emit) => () => {
  emit('after-leave')
}

export const setText = (state) => (text) => {
  state.text = text
}

export const close = ({ state, constants, vm }) => () => {
  afterLeave(
    vm,
    () => {
      const target = state.fullscreen || state.body ? document.body : state.target

      removeClass(target, constants.PARENT_RELATIVE_CLS)
      removeClass(target, constants.PARENT_HIDDEN_CLS)

      if (vm.$el && vm.$el.parentNode) {
        vm.$el.parentNode.removeChild(vm.$el)
      }

      state.closed = true
    },
    300
  )

  state.visible = false
}
