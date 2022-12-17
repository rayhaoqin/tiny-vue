import each from '../base/each'
import isFunction from '../base/isFunction'
import property from '../function/property'

const objectMap = (obj, iterate, context) => {
  let result = {}

  if (obj) {
    if (iterate) {
      if (!isFunction(iterate)) {
        iterate = property(iterate)
      }

      each(obj, (val, index) => {
        result[index] = iterate.call(context, val, index, obj)
      })
    } else {
      return obj
    }
  }

  return result
}

export default objectMap
