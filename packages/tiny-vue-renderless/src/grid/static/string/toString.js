import eqNull from '../base/eqNull'
import isNumber from '../base/isNumber'

const toValString = (obj) => {
  if (isNumber(obj)) {
    if (('' + obj).indexOf('e-') >= 0) {
      let isNegative = obj < 0

      return (isNegative ? '-' : '') + '0' + ('' + ((isNegative ? Math.abs(obj) : obj) + 1)).substr(1)
    }
  }

  return '' + (eqNull(obj) ? '' : obj)
}

export default toValString
