import * as util from '../util'

export default function (rule, checkValue, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0

      if (!rule.pattern.test(checkValue)) {
        errors.push(util.format(options.messages.pattern.mismatch, rule.fullField, checkValue, rule.pattern))
      }
    } else if (typeof rule.pattern === 'string') {
      const _pattern = new RegExp(rule.pattern)

      if (!_pattern.test(checkValue)) {
        errors.push(util.format(options.messages.pattern.mismatch, rule.fullField, checkValue, rule.pattern))
      }
    }
  }
}
