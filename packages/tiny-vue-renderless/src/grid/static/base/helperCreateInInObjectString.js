let objectToString = Object.prototype.toString

function helperCreateInInObjectString(type) {
  return function (obj) {
    return '[object ' + type + ']' === objectToString.call(obj)
  }
}

export default helperCreateInInObjectString
