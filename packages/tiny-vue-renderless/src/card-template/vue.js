import { toolClick, computedTools, computedMoreTools } from './index'

export const api = ['state', 'toolClick']

export const renderless = (
  props,
  { computed, reactive },
  { t, refs, constants }
) => {
  const api = {
    computedMoreTools: computedMoreTools({ props })
  }

  const state = reactive({
    isEnter: false,
    showMoreTools: false,
    moreTools: computed(() => api.computedMoreTools(props)),
    currentTools: computed(() => api.computedTools())
  })

  api.state = state
  api.computedTools = computedTools({ constants, props, refs, state, t })
  api.toolClick = toolClick(state)

  return api
}
