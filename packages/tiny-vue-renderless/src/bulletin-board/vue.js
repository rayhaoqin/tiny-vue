import { getRoute, computedDataList, computedMoreLink } from './index'

export const api = ['state', 'getRoute']

export const renderless = (props, { reactive, computed, watch }) => {
  const api = {}
  const state = reactive({
    actName: props.activeName,
    dataList: computed(() => api.computedDataList()),
    moreLink: computed(() => api.computedMoreLink())
  })

  watch(
    () => props.activeName,
    (value) => {
      state.actName = value
    },
    { immediate: true }
  )

  Object.assign(api, {
    state,
    getRoute,
    computedDataList: computedDataList({ props, state }),
    computedMoreLink: computedMoreLink({ props })
  })

  return api
}
