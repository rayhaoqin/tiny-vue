import Schema from './schema'
import validators from './validations/index'
import getDefaultMessage from './messages'

Schema.validators = validators
Schema.getDefaultMessage = getDefaultMessage

export default Schema
