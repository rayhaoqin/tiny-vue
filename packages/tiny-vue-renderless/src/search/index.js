import { on, off } from '@opentiny/vue-renderless/common/deps/dom'
import PopupManager from '@opentiny/vue-renderless/common/deps/popup-manager'
import { isObject, typeOf } from '@opentiny/vue-renderless/common/type'

export const handleChange = ({ emit, props, state }) => (event) => {
  event.stopPropagation()
  const value = event.target.value
  emit('change', state.searchValue, value)

  props.modelValue !== undefined
    ? emit('update:modelValue', value)
    : emit('update:modelValue', value, state.searchValue)
}

export const showSelector = ({ refs, state }) => () => {
  refs['selector'].style.zIndex = PopupManager.nextZIndex()
  state.show = true
}

export const changeKey = ({ emit, state }) => (key) => {
  state.searchValue = key
  state.show = false

  emit('select', key)
}

export const searchClick = ({ emit, props, state }) => () => {
  if (props.mini && state.collapse) {
    state.collapse = false
  } else {
    emit('search', state.searchValue, state.currentValue)
  }
}

export const searchEnterKey = ({ api, props, refs, nextTick }) => () => {
  if (props.isEnterSearch) {
    api.searchClick()
    nextTick(() => refs.input.blur())
  }
}

export const clickOutside = ({ parent, props, state }) => (event) => {
  if (!parent.$el.contains(event.target)) {
    state.show = false
    props.mini && !state.currentValue && (state.collapse = true)
  }
}

export const setDefaultType = (searchTypes) => {
  let type = {}

  for (let i = 0, len = searchTypes.length; i < len; i++) {
    if (
      isObject(searchTypes[i]) &&
      typeOf(searchTypes[i].value) !== 'undefined' &&
      typeOf(searchTypes[i].text) !== 'undefined'
    ) {
      type = searchTypes[i]
      break
    }
  }

  return type
}

export const formatSearchTypes = (searchTypes) => {
  const types = []

  for (let i = 0, len = searchTypes.length; i < len; i++) {
    if (
      isObject(searchTypes[i]) &&
      typeOf(searchTypes[i].value) !== 'undefined' &&
      typeOf(searchTypes[i].text) !== 'undefined'
    ) {
      types.push(searchTypes[i])
    }
  }

  return types
}

/* istanbul ignore next */
export const mounted = (api) => () => {
  on(document.body, 'click', api.clickOutside)
}

/* istanbul ignore next */
export const beforeDestroy = (api) => () => {
  off(document.body, 'click', api.clickOutside)
}

export const clear = ({ emit, refs, state }) => () => {
  state.currentValue = ''
  refs.input.focus()
  state.focus = true

  emit('change', [], '')
  emit('update:modelValue', '')
  emit('clear')
}
