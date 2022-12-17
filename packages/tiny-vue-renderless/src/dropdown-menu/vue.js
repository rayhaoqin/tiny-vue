import { toggleItem, updateOffset, clickOutside, getScroller, useVuePopper } from './index'

export const api = ['state', 'toggleItem', 'updateOffset', 'clickOutside', 'doDestroy']

export const renderless = (props, hooks, instance) => {
  const api = {}
  const { reactive } = hooks
  const { refs, nextTick, mode } = instance
  const state = reactive({
    offset: 0,
    scroller: null,
    children: [],
    size: '',
    showPopper: false
  })

  if (mode === 'mobile') {
    nextTick(() => {
      state.scroller = getScroller(refs.menu)
    })
  } else {
    useVuePopper({ api, hooks, props, instance, state })
  }

  Object.assign(api, {
    state,
    toggleItem: toggleItem(state),
    clickOutside: clickOutside({ props, refs, state }),
    updateOffset: updateOffset({ props, state, refs })
  })

  return api
}
