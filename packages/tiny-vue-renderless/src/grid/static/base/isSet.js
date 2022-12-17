const supportSet = typeof Set !== 'undefined'

const isSet = (obj) => supportSet && obj instanceof Set

export default isSet
