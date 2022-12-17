import * as util from '../util'

const ENUM = 'enum'

export default function (rule, checkValue, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : []

  if (rule[ENUM].indexOf(checkValue) === -1) {
    errors.push(util.format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')))
  }
}
