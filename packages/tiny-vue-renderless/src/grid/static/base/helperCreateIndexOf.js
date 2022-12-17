const helperCreateIndexOf = (name, callback) => {
  return (obj, val) => {
    if (!obj) {
      return -1
    }
    if (typeof obj === 'string' || Array.isArray(obj)) {
      if (obj[name]) {
        return obj[name](val)
      }

      return callback(obj, val)
    }

    for (let key of Object.keys(obj)) {
      if (val === obj[key]) {
        return key
      }
    }
    return -1
  }
}

export default helperCreateIndexOf
