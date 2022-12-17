import { handleClick, moreNodeClick } from './index'

export const api = ['state', 'handleClick', 'moreNodeClick']

export const renderless = (props, { computed, reactive, watch, inject }, { emit, parent }) => {
  parent.tinyForm = parent.tinyForm || inject('form', null)

  const state = reactive({
    value: props.modelValue,
    buttonData: props.data?.slice(0, props.showMore) || [],
    moreData: props.data?.slice(props.showMore, props.data.length) || [],
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    disabled: computed(() => props.disabled || state.formDisabled),
    attributeValue: computed(() => {
      if (state.disabled) {
        return { disabled: state.disabled }
      }

      return props.plain ? { plain: props.plain } : ''
    })
  })

  watch(
    () => props.modelValue,
    (value) => {
      if (!state.disabled && state.value !== value) {
        state.value = value
      }
    },
    { immediate: true }
  )

  const api = {
    state,
    handleClick: handleClick({ emit, props, state })
  }

  return api
}
