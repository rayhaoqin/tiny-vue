import {
  tagClick,
  confirm,
  clickOutside,
  getOptionStyle,
  reset,
  getTitle,
  bindScroll,
  toggle,
  onScroll,
  open,
  opened,
  close,
  closed,
  clickItem,
  clickWrapper,
  getItemStyle
} from './index'

export const api = [
  'state',
  'confirm',
  'clickOutside',
  'getOptionStyle',
  'reset',
  'tagClick',
  'clickItem',
  'clickWrapper',
  'toggle',
  'open',
  'opened',
  'close',
  'closed'
]

const initState = ({ reactive, computed, api, props, parent }) => {
  const state = reactive({
    sort: props.modelValue,
    transition: true,
    getTitle: false,
    showWrapper: false,
    showPopup: false,
    duration: parent.duration,
    overlay: computed(() => parent.overlay),
    offset: computed(() => parent.state.offset),
    direction: computed(() => parent.direction),
    displayTitle: computed(() => api.getTitle()),
    itemStyle: computed(() => api.getItemStyle()),
    activeColor: computed(() => parent.activeColor),
    closeOnClickOverlay: computed(() => parent.closeOnClickOverlay)
  })

  return state
}

const initApi = ({ api, state, emit, props, parent }) => {
  Object.assign(api, {
    state,
    open: open(emit),
    opened: opened(emit),
    close: close(emit),
    getTitle: getTitle(props),
    onScroll: onScroll(parent),
    reset: reset({ emit, props }),
    closed: closed({ emit, state }),
    clickWrapper: clickWrapper(parent),
    clickOutside: clickOutside(parent),
    tagClick: tagClick({ emit, props }),
    getOptionStyle: getOptionStyle(state),
    toggle: toggle({ parent, props, state }),
    clickItem: clickItem({ emit, props, state }),
    getItemStyle: getItemStyle({ parent, state }),
    bindScroll: bindScroll({ api, parent }),
    confirm: confirm({ emit, props, state })
  })
}

export const renderless = (props, { computed, onMounted, reactive, watch }, { parent, emit, vm }) => {
  const api = {}

  parent = parent.$parent

  const state = initState({ reactive, computed, api, props, parent })

  initApi({ api, state, emit, props, parent })

  watch(() => state.showPopup, api.bindScroll)

  onMounted(() => {
    parent.state.children.push(vm)
  })

  return api
}
