import { setSubitemAttrValue, setGlobalAttrValue, getClassName, getStyle, row } from './index'

export const api = ['state']

export const renderless = (props, { computed, reactive }, { parent }) => {
  const api = {}
  const state = reactive({
    row: computed(() => api.row()),
    style: computed(() => api.getStyle()),
    className: computed(() => api.getClassName())
  })

  Object.assign(api, {
    state,
    row: row(parent),
    setGlobalAttrValue,
    setSubitemAttrValue,
    getStyle: getStyle({ props, state }),
    getClassName: getClassName({ api, props })
  })

  return api
}
