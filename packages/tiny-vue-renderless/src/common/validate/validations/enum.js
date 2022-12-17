import rules from '../rules/index'
import { isEmptyValue } from '../util'
import { hasOwn } from '@opentiny/vue-renderless/common/type'

const ENUM = 'enum'

export default function (rule, checkValue, callback, source, options) {
  const errors = []
  const validate =
    rule.required || (!rule.required && hasOwn.call(source, rule.field))

  if (validate) {
    if (isEmptyValue(checkValue) && !rule.required) {
      return callback()
    }

    rules.required({ rule, checkValue, source, errors, options })

    if (checkValue !== undefined) {
      rules[ENUM](rule, checkValue, source, errors, options)
    }
  }

  callback(errors)
}
