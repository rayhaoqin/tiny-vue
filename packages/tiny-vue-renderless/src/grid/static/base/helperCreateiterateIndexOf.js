import isFunction from './isFunction'
import isString from './isString'
import hasOwnProp from './hasOwnProp'

const helperCreateiterateIndexOf = (callback) => {
  return (obj, iterate, context) => {
    if (!obj || !isFunction(iterate)) {
      return -1
    }
    if (Array.isArray(obj) || isString(obj)) {
      return callback(obj, iterate, context)
    }

    for (let key of Object.keys(obj)) {
      if (hasOwnProp(obj, key) && iterate.call(context, obj[key], key, obj)) {
        return key
      }
    }

    return -1
  }
}

export default helperCreateiterateIndexOf
