const helperCreateToNumber = (handle) => {
  return (str) => {
    if (str) {
      let num = handle(str)

      if (!isNaN(num)) {
        return num
      }
    }

    return 0
  }
}

export default helperCreateToNumber
