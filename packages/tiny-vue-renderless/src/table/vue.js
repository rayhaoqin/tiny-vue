import {
  computedCheckableData,
  computedSelectedKeys,
  computedSelectCls,
  watchDefaultChecked,
  watchSelected,
  selectRow,
  togeSelected,
  togeSelectAll
} from './index'

export const api = ['state', 'selectRow', 'togeSelected', 'togeSelectAll']

export const renderless = (props, { computed, reactive, watch }, { t, emit }) => {
  const api = {}
  const state = reactive({
    selectedRow: null,
    checkChangeByUser: false,
    selected: [],
    checkableData: computed(() => api.computedCheckableData()),
    selectedKeys: computed(() => api.computedSelectedKeys()),
    selectCls: computed(() => api.computedSelectCls())
  })

  Object.assign(api, {
    t,
    state,
    computedSelectCls: computedSelectCls({ state }),
    computedSelectedKeys: computedSelectedKeys({ props, state }),
    computedCheckableData: computedCheckableData({ props }),
    selectRow: selectRow({ emit, state }),
    togeSelected: togeSelected({ state }),
    togeSelectAll: togeSelectAll({ emit, props, state }),
    watchSelected: watchSelected({ emit, props, state }),
    watchDefaultChecked: watchDefaultChecked({ props, state })
  })

  watch(() => props.defaultChecked, api.watchDefaultChecked)

  watch(() => state.selected, api.watchSelected)

  return api
}
