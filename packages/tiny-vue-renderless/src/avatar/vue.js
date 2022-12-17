import { computedAvatarClass, handleError } from './index'

export const api = ['state', 'handleError']

export const renderless = (props, { computed, reactive }, { constants }) => {
  const api = {
    computedAvatarClass: computedAvatarClass(constants)
  }

  const state = reactive({
    isImageExist: true,
    avatarClass: computed(() => api.computedAvatarClass(props))
  })

  Object.assign(api, {
    state,
    handleError: handleError({ props, state })
  })

  return api
}
