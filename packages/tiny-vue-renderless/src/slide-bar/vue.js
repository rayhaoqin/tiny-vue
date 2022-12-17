import { leftClick, rightClick, blockClick, changeState, changeSize, mouseEvent } from './index'

export const api = ['state', 'mouseEvent', 'rightClick', 'leftClick', 'blockClick']

export const renderless = (props, { onMounted, reactive }, { refs, parent, emit }) => {
  const api = {}
  const state = reactive({
    leftLength: 0,
    blockWidth: 0,
    blockMargin: 0,
    showLeft: false,
    showRight: false,
    blockWrapper: 0,
    wrapperWidth: 0,
    currentIndex: -1,
    offsetWidth: 0
  })

  Object.assign(api, {
    state,
    blockClick: blockClick({ emit, state }),
    changeState: changeState({ props, state }),
    changeSize: changeSize({ props, refs, state }),
    leftClick: leftClick({ api, props, refs, state }),
    mouseEvent: mouseEvent({ api, props, refs, state }),
    rightClick: rightClick({ api, parent, props, refs, state })
  })

  onMounted(api.changeSize)

  return api
}
