export const onDragOver = ({ props, state }) => () =>
  !props.disabled && (state.dragover = true)

export const onDrop = ({ emit, props, state }) => (event) => {
  if (props.disabled || !state.uploader) {
    return
  }

  const accept = state.uploader.accept

  state.dragover = false

  if (!accept) {
    emit('file', event.dataTransfer.files)
    return
  }

  const notAcceptedFiles = []

  const filteredFile = [].slice
    .call(event.dataTransfer.files)
    .filter((file) => {
      const { type, name } = file
      const extension =
        name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : ''
      const baseType = type.replace(/\/.*$/, '')

      let isValid = accept
        .split(',')
        .map((type) => type.trim())
        .filter((type) => type)
        .some((type) => {
          if (/\..+$/.test(type)) {
            return extension === type
          }

          if (/\/\*$/.test(type)) {
            return baseType === type.replace(/\/\*$/, '')
          }

          if (/^[^/]+\/[^/]+$/.test(type)) {
            return true
          }

          return false
        })

      !isValid && notAcceptedFiles.push(file)

      return isValid
    })

  notAcceptedFiles.length &&
    state.uploader.$emit('drop-error', notAcceptedFiles)

  emit('file', filteredFile)
}
