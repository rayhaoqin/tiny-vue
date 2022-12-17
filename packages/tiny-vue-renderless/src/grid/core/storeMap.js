// 全局的快捷菜单
const _storeMap = {}

const storeMap = {
  mixin(map) {
    Object.assign(_storeMap, map)
    return storeMap
  },
  get(type) {
    return _storeMap[type]
  },
  add(type, callback) {
    _storeMap[type] = callback
    return storeMap
  },
  delete(type) {
    delete _storeMap[type]
    return storeMap
  }
}

export default storeMap
