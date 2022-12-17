import hasOwnProp from '../base/hasOwnProp'

const handle = ({ useArray, obj, iterate, context, matchValue, restIndex }) => {
  let value,
    flag = 0

  if (useArray && Array.isArray(obj)) {
    for (let index = 0, len = obj.length; index < len; index++) {
      if (!!iterate.call(context, obj[index], index, obj) === matchValue) {
        value = [true, false, index, obj[index]][restIndex]
        flag = 1
        break
      }
    }
  } else {
    for (let key of Object.keys(obj)) {
      if (hasOwnProp(obj, key)) {
        if (!!iterate.call(context, obj[key], key, obj) === matchValue) {
          value = [true, false, key, obj[key]][restIndex]
          flag = 2
          break
        }
      }
    }
  }

  return { value, flag }
}

const helperCreateIterateHandle = (prop, useArray, restIndex, matchValue, defaultValue) => {
  return (obj, iterate, context) => {
    if (!obj || !iterate) {
      return defaultValue
    }
    if (prop && obj[prop]) {
      return obj[prop](iterate, context)
    } else {
      const ret = handle({
        useArray,
        obj,
        iterate,
        context,
        matchValue,
        restIndex
      })

      if (ret.flag) {
        return ret.value
      }
    }

    return defaultValue
  }
}

export default helperCreateIterateHandle
