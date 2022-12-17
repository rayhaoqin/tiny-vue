import { isDate, isRegExp } from '@opentiny/vue-renderless/common/type'
import isNumber from './isNumber'
import isString from './isString'
import isBoolean from './isBoolean'
import isUndefined from './isUndefined'
import keys from './keys'
import every from '../array/every'

let equalVal

const helperEqualCompare = ({ val1, val2, compare, func, key, obj1, obj2 }) => {
  if (val1 === val2) {
    return true
  }

  if (
    val1 &&
    val2 &&
    !isNumber(val1) &&
    !isNumber(val2) &&
    !isString(val1) &&
    !isString(val2)
  ) {
    if (isRegExp(val1)) {
      return compare('' + val1, '' + val2, key, obj1, obj2)
    }

    if (isDate(val1) || isBoolean(val1)) {
      return compare(+val1, +val2, key, obj1, obj2)
    }

    return equalVal(val1, val2, func, key, compare)
  }

  return compare(val1, val2, key, obj1, obj2)
}

equalVal = (val1, val2, func, key, compare) => {
  let result, val1Keys, val2Keys
  let isObj1Arr = Array.isArray(val1)
  let isObj2Arr = Array.isArray(val2)

  if (
    isObj1Arr || isObj2Arr
      ? isObj1Arr && isObj2Arr
      : val1.constructor === val2.constructor
  ) {
    val1Keys = keys(val1)
    val2Keys = keys(val2)

    if (func) {
      result = func(val1, val2, key)
    }

    if (val1Keys.length === val2Keys.length) {
      if (isUndefined(result)) {
        return every(val1Keys, (key, index) => {
          return (
            key === val2Keys[index] &&
            helperEqualCompare({
              val1: val1[key],
              val2: val2[val2Keys[index]],
              compare,
              func,
              key: isObj1Arr || isObj2Arr ? index : key,
              obj1: val1,
              obj2: val2
            })
          )
        })
      }

      return !!result
    }

    return false
  }
}

export default helperEqualCompare
