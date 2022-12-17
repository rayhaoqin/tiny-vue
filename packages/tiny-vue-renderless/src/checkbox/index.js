export const addToStore = ({ state, props }) => () => {
  if (Array.isArray(state.model) && state.model.indexOf(props.label) === -1) {
    state.model.push(props.label)
  } else {
    state.model = props.trueLabel || true
  }
}

export const handleChange = ({
  state,
  props,
  emit,
  nextTick,
  dispatch,
  constants
}) => (event) => {
  if (state.isLimitExceeded) {
    return
  }

  let value

  if (event.target.checked) {
    value = props.trueLabel === undefined ? true : props.trueLabel
  } else {
    value = props.falseLabel === undefined ? false : props.falseLabel
  }

  emit('change', value, event)

  nextTick(() => {
    state.isGroup &&
      dispatch(constants.CHECKBOX_GROUP, 'change', [
        state.checkboxGroup.modelValue
      ])
  })
}

// prettier-ignore
export const computedGetModelGet = ({ state, props }) => () => {
  const model = state.isGroup
    ? state.store
    : props.modelValue !== undefined
      ? props.modelValue
      : state.selfModel

  return ~[undefined, null].indexOf(model) ? [] : model
}

export const computedGetModelSet = ({ state, dispatch, emit, constants }) => (
  value
) => {
  if (state.isGroup) {
    state.isLimitExceeded = false

    state.checkboxGroup.min !== undefined &&
      value.length < state.checkboxGroup.min &&
      (state.isLimitExceeded = true)

    state.checkboxGroup.max !== undefined &&
      value.length > state.checkboxGroup.max &&
      (state.isLimitExceeded = true)

    state.isLimitExceeded === false &&
      dispatch(constants.CHECKBOX_GROUP, 'update:modelValue', [value])
  } else {
    emit('update:modelValue', value)
    state.selfModel = value
  }
}

export const computedIsChecked = ({ state, props }) => () => {
  if (typeof state.model === 'boolean') {
    return state.model
  } else if (Array.isArray(state.model)) {
    return state.model.indexOf(props.label) > -1
  } else if (state.model !== null && state.model !== undefined) {
    return state.model === props.trueLabel
  }
}

export const computedIsGroup = ({ state, parent, constants }) => () => {
  let parentObj = parent.$parent

  while (parentObj) {
    if (parentObj.$options.componentName !== constants.CHECKBOX_GROUP) {
      parentObj = parentObj.$parent
    } else {
      state.checkboxGroup = parentObj
      return true
    }
  }

  return false
}

export const computedStore = ({ state, props }) => () =>
  state.checkboxGroup ? state.checkboxGroup.modelValue : props.modelValue

export const computedIsLimitDisabled = (state) => () => {
  const { max, min } = state.checkboxGroup

  return (
    (!!(max || min) && state.model.length >= max && !state.isChecked) ||
    (state.model.length <= min && state.isChecked)
  )
}

export const computedIsDisabled = ({ state, props }) => () =>
  (state.isGroup
    ? state.checkboxGroup.disabled || props.disabled || state.isLimitDisabled
    : props.disabled) || state.formDisabled

export const computedFormItemSize = (props) => () =>
  (props.formItem || {}).formItemSize

export const computedCheckboxSize = ({ state, props, formItemSize }) => () => {
  const tempCheckboxSize = props.size || formItemSize.value

  return state.isGroup
    ? state.checkboxGroup.state.checkboxGroupSize || tempCheckboxSize
    : tempCheckboxSize
}

export const mounted = ({ props, emit, api, parent }) => () => {
  props.checked && api.addToStore()

  props.indeterminate &&
    parent.$el.setAttribute('aria-controls', props.controls)

  emit('complete', true)
}

export const toggleEvent = ({ parent, props, type }) => {
  const inputEl = parent.$el

  Object.keys(props.events).forEach((ev) =>
    inputEl[type + 'EventListener'](ev, props.events[ev])
  )
}
