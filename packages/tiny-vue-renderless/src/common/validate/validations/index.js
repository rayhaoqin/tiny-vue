import date from './date'
import type from './type'
import float from './float'
import array from './array'
import string from './string'
import method from './method'
import number from './number'
import integer from './integer'
import pattern from './pattern'
import required from './required'
import enumValidator from './enum'

export default {
  date,
  float,
  array,
  string,
  method,
  number,
  integer,
  pattern,
  required,
  hex: type,
  url: type,
  time: type,
  email: type,
  digits: type,
  dateYM: type,
  speczh: type,
  dateYMD: type,
  version: type,
  fileSize: type,
  regexp: method,
  object: method,
  dateTime: type,
  specialch: type,
  boolean: method,
  acceptImg: type,
  specialch2: type,
  acceptFile: type,
  longDateTime: type,
  enum: enumValidator
}
