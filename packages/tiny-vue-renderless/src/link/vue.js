import { handleClick } from './index'

export const api = ['state', 'handleClick']

export const renderless = (props, { inject, reactive, computed }, { emit, parent }) => {
  parent.tinyForm = parent.tinyForm || inject('form', null)

  const state = reactive({
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    disabled: computed(() => props.disabled || state.formDisabled)
  })

  return {
    state,
    handleClick: handleClick({ emit, props, state })
  }
}
