import { getUserHref } from './index'

export const api = ['show', 'getUserHref']

export const renderless = (props, { reactive, ref }) => {
  const state = reactive({
    initialized: false
  })

  const api = {
    state,
    show: ref(false)
  }

  Object.assign(api, {
    getUserHref: getUserHref({ api, props })
  })

  return api
}
