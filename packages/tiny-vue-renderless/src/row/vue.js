import { computedClassName, computedStyle } from './index'

export const api = ['state']

export const renderless = (props, { computed, reactive }) => {
  const api = {
    computedStyle,
    computedClassName
  }

  const state = reactive({
    style: computed(() => api.computedStyle(props.gutter)),
    className: computed(() =>
      api.computedClassName({
        flex: props.flex,
        justify: props.justify,
        align: props.align
      })
    )
  })

  api.state = state

  return api
}
