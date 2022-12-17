const arrayIndexOf = (obj, val) => {
  if (obj.indexOf) {
    return obj.indexOf(val)
  }

  for (let index = 0, len = obj.length; index < len; index++) {
    if (val === obj[index]) {
      return index
    }
  }
}

export default arrayIndexOf
