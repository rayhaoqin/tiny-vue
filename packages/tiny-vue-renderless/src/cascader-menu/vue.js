import { handleExpand, handleMouseMove, clearHoverZone } from './index'
import { CASCADER } from '@opentiny/vue-renderless/common'
import { random } from '@opentiny/vue-renderless/common/string'

export const api = ['state', 'handleMouseMove', 'handleExpand']

export const renderless = (props, { computed, reactive }, { vm, parent }) => {
  const refs = vm.$refs
  const api = {}
  const state = reactive({
    activeNode: null,
    hoverTimer: null,
    id: Math.floor(random() * 10000),
    isEmpty: computed(() => !props.nodes.length),
    menuId: computed(() => `${CASCADER.MenuConnector}${state.id}-${props.index}`)
  })

  Object.assign(api, {
    state,
    clearHoverZone: clearHoverZone(refs),
    handleExpand: handleExpand(state),
    handleMouseMove: handleMouseMove({ api, parent, refs, state, svg: CASCADER.SvgStr })
  })

  return api
}
