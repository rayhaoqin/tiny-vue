import isObject from './isObject'
import isString from './isString'

const toStringJSON = (str) => {
  if (isObject(str)) {
    return str
  } else if (isString(str)) {
    try {
      return JSON.parse(str)
    } catch (error) {
      // do nothing
    }
  }

  return {}
}

export default toStringJSON
