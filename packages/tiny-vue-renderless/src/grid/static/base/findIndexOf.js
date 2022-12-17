import helperCreateiterateIndexOf from './helperCreateiterateIndexOf'

const findIndexOf = helperCreateiterateIndexOf((obj, iterate, context) => {
  for (let index = 0, len = obj.length; index < len; index++) {
    if (iterate.call(context, obj[index], index, obj)) {
      return index
    }
  }

  return -1
})

export default findIndexOf
