let __uniqueId = 0

const uniqueId = (prefix) => (prefix ? '' + prefix : 0) + ++__uniqueId

export default uniqueId
