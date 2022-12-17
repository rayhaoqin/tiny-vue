import { guid } from '@opentiny/vue-renderless/common/string'

import {
  watchVisible,
  watchFocusing,
  show,
  hide,
  handleClick,
  handleTriggerKeyDown,
  handleItemKeyDown,
  resetTabindex,
  removeTabindex,
  initAria,
  initEvent,
  handleMenuItemClick,
  handleMainButtonClick,
  triggerElmFocus,
  initDomOperation,
  mounted,
  beforeDistory
} from './index'

export const api = ['state', 'handleMainButtonClick', 'hide', 'initDomOperation', 'handleClick']

export const renderless = (props, { reactive, watch, provide, onMounted }, { emit, parent, broadcast, vm }) => {
  const api = {}
  const state = reactive({
    visible: false,
    timeout: null,
    focusing: false,
    menuItems: null,
    menuItemsArray: null,
    triggerElm: null,
    dropdownElm: null,
    listId: `dropdown-menu-${guid()}`
  })

  provide('dropdown', vm)

  Object.assign(api, {
    state,
    watchVisible: watchVisible({ broadcast, emit }),
    watchFocusing: watchFocusing({ parent }),
    show: show({ props, state }),
    hide: hide({ api, props, state }),
    mounted: mounted({ api, vm }),
    handleClick: handleClick({ api, props, state }),
    handleTriggerKeyDown: handleTriggerKeyDown({ api, state }),
    handleItemKeyDown: handleItemKeyDown({ api, props, state }),
    resetTabindex: resetTabindex({ api }),
    removeTabindex: removeTabindex({ state }),
    initAria: initAria({ state, props }),
    initEvent: initEvent({ api, props, state, vm }),
    handleMenuItemClick: handleMenuItemClick({ props, state, emit }),
    handleMainButtonClick: handleMainButtonClick({ api, emit }),
    triggerElmFocus: triggerElmFocus({ state }),
    initDomOperation: initDomOperation({ api, state, vm }),
    beforeDistory: beforeDistory({ api, state })
  })

  watch(() => state.visible, api.watchVisible)
  watch(() => state.focusing, api.watchFocusing)

  onMounted(api.mounted)

  return api
}
