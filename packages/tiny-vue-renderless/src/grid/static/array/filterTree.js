import eachTree from './eachTree'

const filterTree = (obj, iterate, options, context) => {
  let result = []

  if (obj && iterate) {
    eachTree(
      obj,
      (...args) => {
        if (iterate.apply(context, args)) {
          result.push(args[0])
        }
      },
      options
    )
  }

  return result
}

export default filterTree
