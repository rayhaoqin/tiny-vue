import rules from '../rules/index'
import { isEmptyValue } from '../util'
import { hasOwn } from '@opentiny/vue-renderless/common/type'

export default function (rule, checkValue, callback, source, options) {
  const errors = []
  const validate =
    rule.required || (!rule.required && hasOwn.call(source, rule.field))

  if (validate) {
    if (isEmptyValue(checkValue, 'string') && !rule.required) {
      return callback()
    }

    rules.required({
      rule,
      checkValue,
      source,
      errors,
      options,
      type: 'string'
    })

    if (!isEmptyValue(checkValue, 'string')) {
      rules.type(rule, checkValue, source, errors, options)
      rules.range(rule, checkValue, source, errors, options)
      rules.pattern(rule, checkValue, source, errors, options)

      if (rule.whitespace === true) {
        rules.whitespace(rule, checkValue, source, errors, options)
      }
    }
  }

  callback(errors)
}
