import { toString, each, remove } from '../static'

const toType = (type) => toString(type).replace('_', '').toLowerCase()
const eventTypes = [
  'created',
  'mounted',
  'activated',
  'beforeDestroy',
  'destroyed',
  'event.clearActived',
  'event.clearFilter',
  'event.showMenu',
  'event.keydown'
].map(toType)
const _storeMap = {}

const Interceptor = {
  mixin(map) {
    each(map, (callback, type) => Interceptor.add(type, callback))
    return Interceptor
  },
  get(type) {
    return _storeMap[toType(type)] || []
  },
  add(type, callback) {
    type = toType(type)

    if (callback && ~eventTypes.indexOf(type)) {
      let eList = _storeMap[type]

      if (!eList) {
        eList = _storeMap[type] = []
      }

      eList.push(callback)
    }

    return Interceptor
  },
  delete(type, callback) {
    const eList = _storeMap[toType(type)]

    if (eList) {
      remove(eList, (cb) => cb === callback)
    }

    return Interceptor
  }
}

export default Interceptor
