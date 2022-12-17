import rules from '../rules/index'

export default function (rule, checkValue, callback, source, options) {
  const errors = []
  const type = Array.isArray(checkValue) ? 'array' : typeof checkValue

  rules.required({ rule, checkValue, source, errors, options, type })
  callback(errors)
}
