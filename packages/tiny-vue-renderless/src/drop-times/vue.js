import { init, change } from './index'

export const api = ['state', 'change']

export const renderless = (props, { onMounted, reactive, watch }, { emit }) => {
  const state = reactive({
    options: [],
    selectedValue: props.modelValue
  })

  watch(
    () => props.modelValue,
    (newValue) => (state.selectedValue = newValue)
  )

  const api = {
    state,
    change: change(emit),
    init: init({ state, props, emit })
  }

  onMounted(api.init)

  return api
}
