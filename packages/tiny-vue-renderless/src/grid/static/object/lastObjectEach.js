import lastArrayEach from '../array/lastArrayEach'
import keys from '../base/keys'

const lastObjectEach = (obj, iterate, context) => {
  lastArrayEach(keys(obj), (key) => {
    iterate.call(context, obj[key], key, obj)
  })
}

export default lastObjectEach
