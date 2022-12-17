export const computedIsClosable = ({ parent, props }) => () => props.withClose || parent.withClose

export const computedActive = ({ parent, nextTick, props, state }) => () => {
  const active = parent.state.currentName === (props.name || state.index)

  if (active) {
    state.loaded = true

    nextTick(() => {
      state.animateShow = true
    })
  } else {
    state.animateShow = false
  }

  return active
}

export const computedPaneName = ({ props, state }) => () => props.name || state.index

export const watchTitle = (parent) => () => parent.$emit('tab-nav-update')
