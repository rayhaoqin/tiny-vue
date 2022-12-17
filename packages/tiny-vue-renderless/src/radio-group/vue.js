import { handleKeydown, mounted } from './index'

export const api = ['state', 'handleKeydown']

export const renderless = (props, { computed, onMounted, reactive, watch }, { parent, dispatch }) => {
  const state = reactive({
    radioGroupSize: computed(() => props.size),
    tag: 'div'
  })

  parent.$on('handleChange', (value) => {
    parent.$emit('change', value)
  })

  const api = {
    state,
    dispatch,
    onMounted: mounted(parent),
    handleKeydown: handleKeydown({ parent })
  }

  watch(
    () => props.modelValue,
    (value) => {
      api.dispatch('FormItem', 'form.change', [value])
    }
  )

  onMounted(api.onMounted)

  return api
}
