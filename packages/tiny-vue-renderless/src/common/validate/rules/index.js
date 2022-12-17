import type from './type'
import range from './range'
import enumRule from './enum'
import pattern from './pattern'
import required from './required'
import whitespace from './whitespace'

export default {
  type,
  range,
  pattern,
  required,
  whitespace,
  enum: enumRule
}
