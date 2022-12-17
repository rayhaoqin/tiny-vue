import isObject from './isObject'
const isEmpty = (obj) => {
  if (isObject(obj)) {
    return Object.keys(obj).length === 0
  }
  return true
}

export default isEmpty
