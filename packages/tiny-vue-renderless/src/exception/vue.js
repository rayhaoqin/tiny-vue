import { create, getMessage } from './index'

export const api = ['state', 'create']

export const renderless = (props, { computed, reactive }, { t, emit }) => {
  const api = {
    create: create(emit),
    getMessage: getMessage({ props, t })
  }

  const state = reactive({
    message: computed(() => api.getMessage({ props, t }))
  })

  api.state = state

  return api
}
