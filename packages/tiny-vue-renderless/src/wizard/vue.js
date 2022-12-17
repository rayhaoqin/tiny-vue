import {
  btnSaveHandle,
  nodeClick,
  submitHandle,
  lastStepHandle,
  nextStepHandle,
  showNode,
  timelineflowData,
  setTimelineflowNodeStatus
} from './index'

export const api = [
  'state',
  'btnSaveHandle',
  'nodeClick',
  'submitHandle',
  'lastStepHandle',
  'nextStepHandle',
  'showNode'
]

export const renderless = (props, { onMounted, reactive }, { emit, constants }) => {
  const state = reactive({
    datas: props.data,
    submitShow: false,
    showIndex: null,
    doing: constants.DOING_STATUS,
    ready: constants.READY_STATUS,
    wait: constants.WAIT_STATUS
  })

  const api = {
    state,
    nodeClick: nodeClick(emit),
    showNode: showNode(emit),
    nextStepHandle: nextStepHandle({ state, emit }),
    lastStepHandle: lastStepHandle({ state, emit }),
    submitHandle: submitHandle({ state, emit }),
    btnSaveHandle: btnSaveHandle({ state, emit }),
    setTimelineflowNodeStatus: setTimelineflowNodeStatus(state)
  }

  api.timelineflowData = timelineflowData({ state, props, api })

  onMounted(api.timelineflowData)

  return api
}
