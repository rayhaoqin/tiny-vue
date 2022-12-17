import { computeData } from './index'

export const api = ['state']

export const renderless = (props, { computed, reactive }) => {
  const state = reactive({
    data: computed(() => computeData({ props }))
  })

  const api = { state }

  return api
}
