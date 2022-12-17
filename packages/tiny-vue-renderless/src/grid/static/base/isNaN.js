import isNumber from './isNumber'

const isNumberNaN = (obj) => isNumber(obj) && isNaN(obj)

export default isNumberNaN
