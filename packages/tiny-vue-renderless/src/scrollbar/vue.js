import { handleScroll, update } from './index'
import { addResizeListener, removeResizeListener } from '@opentiny/vue-renderless/common/deps/resize-event'

export const api = ['state', 'update', 'handleScroll']

export const renderless = (props, { onBeforeUnmount, onMounted, reactive }, { refs, nextTick, emit }) => {
  const state = reactive({
    sizeWidth: '0',
    sizeHeight: '0',
    moveX: 0,
    moveY: 0
  })

  const api = {
    state,
    update: update({ refs, state }),
    handleScroll: handleScroll({ refs, state, emit })
  }

  onMounted(() => {
    if (props.native) {
      return
    }

    nextTick(api.update)

    !props.noresize && addResizeListener(refs.resize, api.update)
  })

  onBeforeUnmount(() => {
    if (props.native) {
      return
    }

    !props.noresize && removeResizeListener(refs.resize, api.update)
  })

  return api
}
