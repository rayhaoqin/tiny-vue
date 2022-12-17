export const create = (emit) => () => emit('click')

export const getMessage = ({ props, t }) => () => {
  const types = ['build', 'weaknet', 'pcview', 'busy', 'noperm']

  return props.message || t(`ui.exception.${~types.indexOf(props.type) ? props.type : 'nodata'}`)
}
