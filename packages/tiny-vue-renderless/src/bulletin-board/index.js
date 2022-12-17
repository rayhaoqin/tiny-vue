import { xss } from '@opentiny/vue-renderless/common/xss.js'

export const getRoute = (route) => `/${route || ''}`.replace(/^\/+/, '/')

export const computedDataList = ({ props, state }) => () => {
  const list = props.data[Number(state.actName) - 1] || []

  list.forEach((subItem) => {
    subItem.url = xss.filterUrl(subItem.url)
  })

  return list
}

export const computedMoreLink = ({ props }) => () => {
  return props.moreLink && xss.filterUrl(props.moreLink.url)
}
