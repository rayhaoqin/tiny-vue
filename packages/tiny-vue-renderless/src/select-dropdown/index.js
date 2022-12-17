export const mounted = ({ selectEmitter, constants, state, selectVm, updatePopper, destroyPopper, parent }) => () => {
  selectEmitter.on(constants.EVENT_NAME.updatePopper, (keepZIndex) => {
    let hideDrop = false

    if (!state.referenceElm || state.referenceElm.nodeType !== 1) {
      state.referenceElm = selectVm.$refs.reference && selectVm.$refs.reference.$el
      selectVm.popperElm = selectVm.state.popperElm = state.popperElm = parent.$el
    }

    if (parent.select.state.visible && !hideDrop) {
      updatePopper(keepZIndex)
      hideDrop = true
    }
  })

  selectEmitter.on(constants.EVENT_NAME.destroyPopper, destroyPopper)
}
