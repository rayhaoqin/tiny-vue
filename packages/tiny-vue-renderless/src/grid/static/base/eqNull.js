import isNullType from './isNull'
import isUndefinedType from './isUndefined'

const eqNull = (object) => isNullType(object) || isUndefinedType(object)

export default eqNull
