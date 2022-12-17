import isNull from '../base/isNull'

const property = (key, defs) => {
  return (object) => (isNull(object) ? defs : object[key])
}

export default property
