import objectEach from './objectEach'

const values = (obj, iterator, ctx) => {
  const objectValues = []

  objectEach(
    obj,
    (val) => {
      objectValues.push(val)
    },
    ctx
  )

  return objectValues
}

export default values
