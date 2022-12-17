import {
  BAR_MAP,
  renderThumbStyle,
  clickThumbHandler,
  clickTrackHandler,
  startDrag,
  mouseMoveDocumentHandler,
  mouseUpDocumentHandler
} from './index'
import { on, off } from '@opentiny/vue-renderless/common/deps/dom'

export const api = [
  'state',
  'startDrag',
  'renderThumbStyle',
  'clickTrackHandler',
  'clickThumbHandler',
  'mouseUpDocumentHandler',
  'mouseMoveDocumentHandler'
]

export const renderless = (props, { computed, onUnmounted, reactive }, { refs, parent }) => {
  const state = reactive({
    bar: computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal']),
    wrap: computed(() => parent.$refs.wrap)
  })

  const api = {
    state,
    renderThumbStyle,
    clickTrackHandler: clickTrackHandler({ refs, state }),
    mouseMoveDocumentHandler: mouseMoveDocumentHandler({ refs, state })
  }

  onUnmounted(() => off(document, 'mouseup', api.mouseUpDocumentHandler))

  return Object.assign(api, {
    startDrag: startDrag({ api, on, state }),
    clickThumbHandler: clickThumbHandler({ api, state }),
    mouseUpDocumentHandler: mouseUpDocumentHandler({ api, off, state })
  })
}
