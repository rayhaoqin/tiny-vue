import { handleFocus, handleEnterClick, handleHeaderClick } from './index'
import { guid } from '@opentiny/vue-renderless/common/string'

export const api = ['state', 'isActive', 'handleFocus', 'handleEnterClick', 'handleHeaderClick']

export const renderless = (props, { computed, reactive }, { parent, constants, dispatch }) => {
  const _constants = parent.collapse._constants
  const componentName = _constants.COMPONENT_NAME.Collapse
  const eventName = _constants.EVENT_NAME.CollapseItemClick

  const state = reactive({
    id: guid(),
    isClick: false,
    focusing: false,
    contentHeight: 0,
    contentWrapStyle: { height: 'auto', display: 'block' },
    isActive: computed(() => parent.collapse.state.activeNames.indexOf(props.name) > -1)
  })

  const api = {
    state,
    handleFocus: handleFocus({ state, interval: constants.INTERVAL }),
    handleEnterClick: handleEnterClick({ componentName, dispatch, eventName, parent }),
    handleHeaderClick: handleHeaderClick({ componentName, dispatch, eventName, props, parent, state })
  }

  return api
}
