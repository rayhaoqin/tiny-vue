import {
  initData,
  dialogTitle,
  disabledParentNode,
  filterNode,
  getValue,
  hideDialog,
  showDialog,
  sureNodevalue,
  disabledTreeNode,
  initService
} from './index'
import { copyArray } from '@opentiny/vue-renderless/common/object'
import { setMenuKey } from '@opentiny/vue-renderless/tree-menu'

export const api = [
  'state',
  'initData',
  'filterNode',
  'getValue',
  'hideDialog',
  'setMenuKey',
  'showDialog',
  'sureNodevalue'
]

const initState = ({ reactive, computed, api }) => {
  const state = reactive({
    filterText: '',
    datas: [],
    disabled: false,
    alertShow: false,
    boxVisibility: false,
    listItem: [],
    getNodeValue: [],
    currentCheckNode: [],
    titles: computed(() => api.dialogTitle())
  })

  return state
}

const initWatch = ({ watch, state, props, nextTick, vm }) => {
  watch(
    () => state.filterText,
    (value) => nextTick(() => vm.$refs.tree.filter(value))
  )

  watch(
    () => props.data,
    (value) => {
      if (value) {
        const changeData = copyArray(value)

        changeData.forEach((item) => {
          if (!item.children) {
            item.disabled = false
          } else {
            item.children.forEach((item) => {
              item.disabled = false
            })
          }
        })

        state.datas = changeData
      }
    },
    { immediate: true }
  )
}

const initApi = ({ api, state, constants, props, t, service, vm }) => {
  Object.assign(api, {
    state,
    filterNode: filterNode(),
    showDialog: showDialog(state),
    sureNodevalue: sureNodevalue(state),
    disabledTreeNode: disabledTreeNode(state),
    disabledParentNode: disabledParentNode(state),
    dialogTitle: dialogTitle({ constants, props, t }),
    setMenuKey: setMenuKey(api),
    getValue: getValue({ api, state, props }),
    initData: initData({ state, props, service, api }),
    hideDialog: hideDialog({ api, state, vm, props })
  })
}

export const renderless = (
  props,
  { computed, onMounted, reactive, watch },
  { t, vm, service, constants, nextTick }
) => {
  service = initService({ props, service })

  const api = {}
  const state = initState({ reactive, computed, api })

  initWatch({ watch, state, props, nextTick, vm })

  onMounted(() => {
    api.initData()
    api.disabledParentNode(state)
  })

  initApi({ api, state, constants, props, t, service, vm })

  return api
}
