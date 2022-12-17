import each from '../base/each'
import assign from '../object/assign'

const defaultOptions = { parentKey: 'parentId', key: 'id', children: 'children' }

const unTreeList = (result, array, opts) => {
  let optChildren = opts.children
  let optData = opts.data

  each(array, (item) => {
    const children = item[optChildren]

    if (optData) {
      item = item[optData]
    }

    result.push(item)

    children && unTreeList(result, children, opts)
  })

  return result
}

const toTreeArray = (array, options) => {
  return unTreeList([], array, assign({}, defaultOptions, options))
}

export default toTreeArray
