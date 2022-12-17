import { mousedown, selectItem, keydown } from './index'
import { on, off } from '@opentiny/vue-renderless/common/deps/dom'

export const api = ['state', 'mousedown', 'selectItem']

export const renderless = (props, { onUnmounted, reactive, watch }, { emit }) => {
  const state = reactive({
    hoverValue: ''
  })

  const api = {
    state,
    mousedown,
    selectItem: selectItem({ emit, state }),
    keydown: keydown({ emit, props, state })
  }

  watch(
    () => props.isMemoryStorage,
    (value) => !value && (state.hoverValue = ''),
    { immediate: true }
  )

  onUnmounted(() => {
    state.hoverValue = ''
    off(document, 'keydown', api.keydown)
  })

  on(document, 'keydown', api.keydown)

  return api
}
