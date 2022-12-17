import { xss } from '@opentiny/vue-renderless/common/xss.js'

export const computeData = ({ props }) => {
  if (Array.isArray(props.data) && props.data.length) {
    props.data.forEach((item) => {
      item.url = xss.filterUrl(item.url)
    })
  }

  return props.data
}
