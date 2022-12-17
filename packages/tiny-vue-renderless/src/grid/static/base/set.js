import helperGetHGSKeys from './helperGetHGSKeys'
import hasOwn from './hasOwnProp'

const sKeyRE = /(.+)\[(\d+)\]$/

const valSet = (obj, key, isSet, value) => {
  if (obj[key]) {
    if (isSet) {
      obj[key] = value
    }
  } else {
    const matchs = key ? key.match(sKeyRE) : null
    const rest = isSet ? value : {}

    if (matchs) {
      const key = matchs[1]
      const index = parseInt(matchs[2])

      if (obj[key]) {
        obj[key][index] = rest
      } else {
        obj[key] = new Array(index + 1)
        obj[key][index] = rest
      }
    } else {
      obj[key] = rest
    }

    return rest
  }

  return obj[key]
}

const set = (obj, property, value) => {
  if (obj) {
    if (obj[property] || hasOwn(obj, property)) {
      obj[property] = value
    } else {
      let rest = obj
      let props = helperGetHGSKeys(property)
      let len = props.length

      for (let index = 0; index < len; index++) {
        rest = valSet(rest, props[index], index === len - 1, value)
      }
    }
  }

  return obj
}

export default set
