export const comptCheckPath = ({ api, parent, state }) => () => {
  if (!state.config.checkStrictly) {
    return false
  }

  return parent.state.checkedNodePaths.some((checkedPath) => api.isInPath(checkedPath))
}

export const handleExpand = ({ api, parent, props, state }) => () => {
  const { multiple, checkStrictly } = state.config

  if ((!checkStrictly && state.isDisabled) || props.node.loading) {
    return
  }

  if (state.config.lazy && !props.node.loaded) {
    parent.lazyLoad(props.node, () => {
      if (!state.isLeaf) api.handleExpand()

      if (multiple) {
        const checked = state.isLeaf ? props.node.checked : false
        api.handleMultiCheckChange(checked)
      }
    })
  } else {
    parent.handleExpand(props.node)
  }
}

export const handleCheckChange = ({ api, parent, dispatch, state }) => () => {
  parent.handleCheckChange(state.value)
  api.handleExpand()
  dispatch('TinyCascaderPanel', 'close', false)
}

export const handleMultiCheckChange = ({ parent, props }) => (checked) => {
  props.node.doCheck(checked)
  parent.calculateMultiCheckedValue()
}

export const isInPath = (props) => (pathNodes) => {
  const selectedPathNode = pathNodes[props.node.level - 1] || {}
  return selectedPathNode.uid === props.node.uid
}
