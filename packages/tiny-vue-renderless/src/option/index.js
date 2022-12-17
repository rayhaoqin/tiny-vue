import { getObj } from '@opentiny/vue-renderless/common/object'

const escapeRegexpString = (value = '') =>
  String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

export const isEqual = ({ select, state }) => (a, b) => {
  if (!state.isObject) {
    return a === b
  } else {
    const valueKey = select.valueKey
    return getObj(a, valueKey) === getObj(b, valueKey)
  }
}

export const contains = ({ select, state }) => (arr = [], target = null) => {
  if (!state.isObject) {
    return arr && arr.indexOf(target) > -1
  } else {
    const valueKey = select.valueKey

    return (
      arr &&
      arr.some((item) => {
        return getObj(item, valueKey) === getObj(target, valueKey)
      })
    )
  }
}

export const handleGroupDisabled = (state) => (val) => {
  state.groupDisabled = val
}

export const hoverItem = ({ select, props, state, vm }) => () => {
  if (!props.disabled && !state.groupDisabled) {
    select.state.hoverIndex = select.state.options.indexOf(vm)
  }
}

export const selectOptionClick = ({
  props,
  state,
  select,
  constants,
  vm
}) => () => {
  if (props.disabled !== true && state.groupDisabled !== true) {
    select.state.selectEmitter.emit(
      constants.EVENT_NAME.handleOptionClick,
      vm,
      true
    )
  }
}

export const queryChange = ({ select, props, state }) => (query) => {
  state.visible =
    new RegExp(escapeRegexpString(query), 'i').test(state.currentLabel) ||
    props.created

  select.state.filteredOptionsCount += state.visible ? 1 : -1
}

export const toggleEvent = ({ props, refs, type }) => {
  const optionEl = refs.option

  Object.keys(props.events).forEach((ev) => {
    optionEl[type + 'EventListener'](ev, props.events[ev])
  })
}
