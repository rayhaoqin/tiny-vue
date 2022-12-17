import rules from '../rules/index'
import { isEmptyValue } from '../util'
import { hasOwn } from '@opentiny/vue-renderless/common/type'

export default function (rule, checkValue, callback, source, options) {
  const validate =
    rule.required || (!rule.required && hasOwn.call(source, rule.field))
  const errors = []

  if (validate) {
    if (!rule.required && isEmptyValue(checkValue)) {
      return callback()
    }

    rules.required({ rule, checkValue, source, errors, options })

    if (undefined !== checkValue) {
      rules.type(rule, checkValue, source, errors, options)
    }
  }

  callback(errors)
}
