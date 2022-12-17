import { isObject, isNull } from '@opentiny/vue-renderless/common/type'

export const getRouteActive = ({ props, route }) => () => {
  if (props.to && route) {
    const config = isObject(props.to) ? props.to : { path: props.to }
    const pathMatched = config.path === route.path
    const nameMatched = !isNull(config.name) && config.name === route.name

    return pathMatched || nameMatched
  }
}

export const onClick = ({ api, emit, parent, props, router, state }) => () => {
  parent.$parent.onChange(props.name || parent.index || state.index)

  emit('click', event)

  api.routeTab(router)
}

export const bindChildren = (parent) => () => {
  if (!parent.$parent) {
    return
  }

  parent.$parent.state.children = parent.$parent.getChildrens()
}

export const routeTab = (props, state) => (router) => {
  const { to, replace } = props
  const { url } = state

  if (to && router) {
    const promise = router[replace ? 'replace' : 'push'](to)

    if (promise && promise.catch) {
      promise.catch((err) => {
        if (err && err.name !== 'NavigationDuplicated') {
          throw err
        }
      })
    }
  } else if (url) {
    replace ? location.replace(url) : (location.href = url)
  }
}
