import * as util from '../util'
import { hasOwn } from '@opentiny/vue-renderless/common/type'

export default function ({ rule, checkValue, source, errors, options, type }) {
  if (
    rule.required &&
    (!hasOwn.call(source, rule.field) ||
      util.isEmptyValue(checkValue, type || rule.type))
  ) {
    errors.push(util.format(options.messages.required, rule.fullField))
  }
}
