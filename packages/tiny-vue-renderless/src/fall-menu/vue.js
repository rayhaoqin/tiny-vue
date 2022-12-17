import {
  mouseover,
  mouseout,
  computePx,
  reRender,
  arrowClick,
  overContent,
  mounted,
  beforeDestroy,
  computeLeft,
  computeData
} from './index'

export const api = ['state', 'fall', 'arrowClick', 'mouseover', 'mouseout', 'overContent', 'reRender', 'left']

const initState = ({ reactive, computed, api, props }) => {
  const state = reactive({
    pager: 1,
    level2data: [],
    activeNode: null,
    isActive: props.value,
    pagerData: { data: [], offset: [], index: [] },
    left: computed(() => api.computeLeft()),
    data: computed(() => api.computeData())
  })

  return state
}

const initApi = ({ api, state, fall, props, refs }) => {
  Object.assign(api, {
    fall,
    state,
    computePx: computePx({ props, refs, state }),
    mounted: mounted({ api }),
    computeLeft: computeLeft({ state }),
    beforeDestroy: beforeDestroy(api),
    computeData: computeData({ props }),
    arrowClick: arrowClick(state),
    overContent: overContent(state),
    mouseout: mouseout(state),
    mouseover: mouseover({ props, fall, state }),
    reRender: reRender({ api, state })
  })
}

export const renderless = (props, { computed, reactive, onMounted, onBeforeUnmount, ref }, { refs }) => {
  const api = {}
  const fall = ref(null)
  const state = initState({ reactive, computed, api, props })

  initApi({ api, state, fall, props, refs })

  onMounted(api.mounted)
  onBeforeUnmount(api.beforeDestroy)

  return api
}
