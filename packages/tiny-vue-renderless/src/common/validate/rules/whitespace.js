import * as util from '../util'

export default function (rule, checkValue, source, errors, options) {
  if (/^\s+$/.test(checkValue) || checkValue === '') {
    errors.push(util.format(options.messages.whitespace, rule.fullField))
  }
}
