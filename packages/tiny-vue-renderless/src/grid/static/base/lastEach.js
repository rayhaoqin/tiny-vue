import lastArrayEach from '../array/lastArrayEach'
import lastObjectEach from '../object/lastObjectEach'

const lastEach = (obj, iterate, context) => {
  if (obj) {
    return Array.isArray(obj) ? lastArrayEach(obj, iterate, context) : lastObjectEach(obj, iterate, context)
  }

  return obj
}

export default lastEach
