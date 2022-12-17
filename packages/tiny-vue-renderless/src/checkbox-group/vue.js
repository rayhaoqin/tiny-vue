import { computedFormItemSize, computedCheckboxGroupSize } from './index'

export const api = ['state']

export const renderless = (
  props,
  { computed, reactive, watch },
  { dispatch, constants }
) => {
  const api = {
    computedFormItemSize: computedFormItemSize(props)
  }

  const formItemSize = computed(() => api.computedFormItemSize())

  const state = reactive({
    checkboxGroupSize: computed(() => api.computedCheckboxGroupSize())
  })

  Object.assign(api, {
    state,
    computedCheckboxGroupSize: computedCheckboxGroupSize({
      props,
      formItemSize
    })
  })

  watch(
    () => props.modelValue,
    (value) => dispatch(constants.FORM_ITEM, constants.FORM_CHANGE, [value])
  )

  return api
}
