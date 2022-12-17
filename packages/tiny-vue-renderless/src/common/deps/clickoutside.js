import { on } from '@opentiny/vue-renderless/common/deps/dom'

const isServer = typeof window === 'undefined'
const nodeList = []
const nameSpace = '@@clickoutsideContext'
let startClick
let seed = 0

if (!isServer) {
  on(document, 'mousedown', (event) => (startClick = event))

  on(document, 'mouseup', (event) => {
    nodeList.forEach((node) => node[nameSpace].documentHandler(event, startClick))
  })
}

const createDocumentHandler = (el, binding, vnode) => {
  return function (mouseup = {}, mousedown = {}) {
    let popperElm = vnode.context.popperElm || vnode.context.state.popperElm

    if (
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (popperElm && (popperElm.contains(mouseup.target) || popperElm.contains(mousedown.target)))
    ) {
      return
    }

    if (binding.expression && el[nameSpace].methodName && vnode.context[el[nameSpace].methodName]) {
      vnode.context[el[nameSpace].methodName]()
    } else {
      el[nameSpace].bindingFn && el[nameSpace].bindingFn()
    }
  }
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-clickoutside="handleClose">
 * ```
 */
export default {
  bind: (el, binding, vnode) => {
    nodeList.push(el)
    const id = seed++

    el[nameSpace] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    }
  },

  update: (el, binding, vnode) => {
    el[nameSpace].documentHandler = createDocumentHandler(el, binding, vnode)
    el[nameSpace].methodName = binding.expression
    el[nameSpace].bindingFn = binding.value
  },

  unbind: (el) => {
    if (el.nodeType !== Node.ELEMENT_NODE) {
      return
    }

    let len = nodeList.length

    for (let i = 0; i < len; i++) {
      if (nodeList[i][nameSpace].id === el[nameSpace].id) {
        nodeList.splice(i, 1)
        break
      }
    }

    delete el[nameSpace]
  }
}
