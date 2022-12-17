import { computedBindStyle, stopAnimation, startAnimation } from './index'

export const api = ['state', 'startAnimation', 'stopAnimation']

export const renderless = (props, { computed, reactive }, { constants }) => {
  const api = {
    computedBindStyle
  }

  const state = reactive({
    isStop: false,
    bindStyle: computed(() =>
      api.computedBindStyle({ constants, time: props.time })
    )
  })

  Object.assign(api, {
    state,
    startAnimation: startAnimation({ props, state }),
    stopAnimation: stopAnimation({ props, state })
  })

  return api
}
