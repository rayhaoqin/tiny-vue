import { comptCheckPath, handleExpand, isInPath, handleCheckChange, handleMultiCheckChange } from './index'

export const api = ['state', 'handleMultiCheckChange', 'handleCheckChange', 'handleExpand']

export const renderless = (props, { computed, reactive, inject }, { dispatch }) => {
  const parent = inject('panel')
  const api = {}
  const state = reactive({
    config: computed(() => parent.state.config),
    isLeaf: computed(() => props.node.isLeaf),
    isDisabled: computed(() => props.node.isDisabled),
    checkedValue: computed(() => parent.state.checkedValue),
    isChecked: computed(() => props.node.isSameNode(state.checkedValue)),
    inActivePath: computed(() => api.isInPath(parent.state.activePath)),
    inCheckedPath: computed(() => api.comptCheckPath()),
    value: computed(() => props.node.getValueByOption())
  })

  Object.assign(api, {
    state,
    isInPath: isInPath(props),
    handleExpand: handleExpand({ api, props, parent, state }),
    comptCheckPath: comptCheckPath({ api, parent, state }),
    handleCheckChange: handleCheckChange({ api, parent, dispatch, state }),
    handleMultiCheckChange: handleMultiCheckChange({ parent, props })
  })

  return api
}
