import helperEqlCompare from './helperEqualCompare'

const isEqual = (obj1, obj2) => {
  return helperEqlCompare({
    val1: obj1,
    val2: obj2,
    compare: (v1, v2) => v1 === v2
  })
}

export default isEqual
