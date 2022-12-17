import { xss } from '@opentiny/vue-renderless/common/xss.js'

export const filterNode = (props) => (value, data) => {
  const node = data[props.props.label || 'label'] || ''

  return node.indexOf(value) !== -1
}

export const searchNodeText = ({ state, refs, nextTick }) => () => {
  nextTick(() => refs.tree.filter(state.filterText))
}

export const hideNodeText = (state) => () => {
  if (state.toggleIcon && state.showNode) {
    state.toggleIcon = false
    state.showNode = false
  } else {
    state.toggleIcon = true
    state.showNode = true
  }
}

export const initData = ({ state, props, service, api }) => () => {
  if (props.data) {
    state.datas = props.data
    return
  }

  if (typeof service.getMenuDataSync === 'function') {
    const menuData = service.getMenuDataSync()

    state.datas = api.setMenuKey({ newData: [], menuData })
  }
}

export const computedPlaceholder = ({ constants, props, t }) => () =>
  props.placeholder || t(constants.LOCALE_PLACEHOLDER)

export const nodeClick = (emit) => (nodeData, node) => {
  emit('node-click', nodeData, node)
}

export const nodeExpand = (emit) => (nodeData, node, instance) => {
  emit('node-expand', nodeData, node, instance)
}

export const nodeDragStart = (emit) => (node, event) => {
  emit('node-drag-start', node, event)
}

export const nodeCollapse = (emit) => (nodeData, node) => {
  emit('node-collapse', nodeData, node)
}

export const nodeDragEnter = (emit) => (dragNode, dropNode, event) => {
  emit('node-drag-enter', dragNode, dropNode, event)
}

export const nodeDragOver = (emit) => (dragNode, dropNode, event) => {
  emit('node-drag-over', dragNode, dropNode, event)
}

export const nodeDragLeave = (emit) => (dragNode, dropNode, event) => {
  emit('node-drag-leave', dragNode, dropNode, event)
}

export const nodeDragEnd = (emit) => (dragNode, dropNode, dropType, event) => {
  emit('node-drag-end', dragNode, dropNode, dropType, event)
}

export const nodeDrop = (emit) => (dragNode, dropNode, dropType, event) => {
  emit('node-drop', dragNode, dropNode, dropType, event)
}

export const clickA = (href) => {
  href = xss.filterUrl(href)
  return href && (location.href = href)
}
