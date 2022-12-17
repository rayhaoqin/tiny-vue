export const close = ({ emit, state }) => () => {
  state.show = false
  emit('close')
}

export const computedGetIcon = ({ constants, props }) => () => props.icon || constants.ICON_MAP[props.type]

export const computedGetTitle = ({ constants, t, props }) => () => props.title || t(constants.TITLE_MAP[props.type])
