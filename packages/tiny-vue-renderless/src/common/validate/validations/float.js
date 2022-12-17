import rules from '../rules/index'
import { isEmptyValue } from '../util'
import { hasOwn } from '@opentiny/vue-renderless/common/type'

export default function (rule, checkValue, cb, source, options) {
  const errors = []
  const validate =
    rule.required || (!rule.required && hasOwn.call(source, rule.field))

  if (validate) {
    if (isEmptyValue(checkValue) && !rule.required) {
      return cb()
    }

    rules.required({ rule, checkValue, source, errors, options })

    if (checkValue !== undefined) {
      rules.type(rule, checkValue, source, errors, options)
      rules.range(rule, checkValue, source, errors, options)
    }
  }

  cb(errors)
}
