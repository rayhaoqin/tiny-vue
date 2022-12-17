import arrayEach from '../array/arrayEach'
import objectEach from '../object/objectEach'

const each = (obj, iterate, context) => {
  if (obj) {
    return Array.isArray(obj) ? arrayEach(obj, iterate, context) : objectEach(obj, iterate, context)
  }

  return obj
}

export default each
