import { format } from '@opentiny/vue-renderless/common/date'

export const init = ({ state, props }) => () => {
  let list = [],
    value

  for (let minutes = props.start; minutes <= props.end; minutes += props.step) {
    value = format(new Date(0, 0, 0, 0, minutes, 0), 'hh:mm')

    list.push({
      label: value,
      value: value
    })
  }

  state.options = list
}

export const change = (emit) => (value) => {
  emit('update:modelValue', value)
  emit('change', value)
}
