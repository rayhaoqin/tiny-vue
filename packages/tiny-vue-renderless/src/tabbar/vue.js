import { setActiveItem, onChange, getChildrens } from './index'

export const api = ['state', 'onChange', 'getChildrens']

export const renderless = (
  props,
  { computed, onMounted, reactive, watch },
  { refs, emit, nextTick, childrenHandler }
) => {
  const state = reactive({
    height: null,
    children: [],
    fit: computed(() => (props.safeAreaInsetBottom !== null ? props.safeAreaInsetBottom : props.fixed))
  })

  const api = {
    state,
    onChange: onChange({ emit, props }),
    parent: computed(() => api.getParent()),
    setActiveItem: setActiveItem({ props, state }),
    getChildrens: getChildrens({ childrenHandler })
  }

  onMounted(() => {
    if (props.placeholder && props.fixed) {
      nextTick(() => {
        state.height = refs.tabbar.getBoundingClientRect().height
      })
    }
  })

  watch(() => props.modelValue, api.setActiveItem, { immediate: true })

  watch(() => state.children, api.setActiveItem, { immediate: true })

  return api
}
