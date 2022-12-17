import isPlainObject from './isPlainObject'
import objectMap from '../object/objectMap'
import map from '../array/map'

let deepClone
const startClone = (func, obj, deep) => {
  return func(obj, deep ? (val) => deepClone(val, deep) : (val) => val)
}

deepClone = (val, deep) => {
  return isPlainObject(val)
    ? startClone(objectMap, val, deep)
    : Array.isArray(val)
    ? startClone(map, val, deep)
    : val
}

const clone = (obj, deep) => (obj ? deepClone(obj, deep) : obj)

export default clone
