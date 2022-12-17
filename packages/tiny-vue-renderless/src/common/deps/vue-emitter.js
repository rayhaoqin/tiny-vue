export default (vm) => {
  const broadcast = (vm, componentName, eventName, params) => {
    vm.$children.forEach((child) => {
      const name = child.$options.componentName

      if (name === componentName) {
        child.$emit(eventName, params)
      } else {
        broadcast(child, componentName, eventName, params)
      }
    })
  }

  return {
    dispatch(componentName, eventName, params) {
      let parent = vm.$parent || vm.$root
      let name = parent.$options.componentName

      while (parent && !parent.$attrs.novalid && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast(vm, componentName, eventName, params)
    }
  }
}
