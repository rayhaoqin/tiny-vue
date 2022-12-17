import {
  initData,
  setMenuKey,
  filterNode,
  watchFilterText,
  nodeDragStart,
  nodeDragEnter,
  nodeDragOver,
  nodeDragEnd,
  nodeDrop,
  nodeExpand,
  nodeCollapse,
  nodeClick,
  checkChange,
  check,
  currentChange,
  getTitle
} from './index'

export const api = [
  'state',
  't',
  'initData',
  'setMenuKey',
  'filterNode',
  'nodeDragStart',
  'nodeDragEnter',
  'nodeDragOver',
  'nodeDragEnd',
  'nodeDrop',
  'nodeExpand',
  'nodeCollapse',
  'nodeClick',
  'checkChange',
  'check',
  'currentChange',
  'getTitle'
]

export const renderless = (props, { watch, reactive, onMounted }, { t, service, refs, emit }) => {
  service = service || { base: {} }
  service = { getMenuDataSync: props.getMenuDataSync || service.base.getMenuDataSync }

  const state = reactive({
    data: [],
    filterText: ''
  })

  Object.assign(api, {
    t,
    state,
    check: check(emit),
    filterNode: filterNode(),
    nodeDrop: nodeDrop(emit),
    nodeClick: nodeClick(emit),
    nodeExpand: nodeExpand(emit),
    nodeDragEnd: nodeDragEnd(emit),
    checkChange: checkChange(emit),
    nodeCollapse: nodeCollapse(emit),
    nodeDragOver: nodeDragOver(emit),
    nodeDragStart: nodeDragStart(emit),
    nodeDragEnter: nodeDragEnter(emit),
    currentChange: currentChange(emit),
    watchFilterText: watchFilterText(refs),
    getTitle: getTitle(props),
    setMenuKey: setMenuKey(api),
    initData: initData({ state, props, service, api })
  })

  watch(
    () => props.data,
    (value) => (state.data = value),
    { immediate: true }
  )

  watch(() => state.filterText, api.watchFilterText, { deep: true })

  onMounted(api.initData)

  return api
}
