export const parsePercentage = () => (val) => parseInt(val, 10)

export const handleClick = ({ props, api, parent }) => (file) => {
  if (parent.state.isEdm) {
    props.openDownloadFile && api.edmDownloadFile(file)
  } else {
    props.openDownloadFile && api.downloadFile(file)
  }

  return props.handlePreview && props.handlePreview(file)
}

export const downloadFile = (service) => (file) => {
  const data = file && file.response && file.response.data

  let responseFile
  if (Array.isArray(data)) {
    responseFile = data[0]
  } else if (data && typeof data === 'object') {
    for (let key of Object.keys(data)) {
      responseFile = data[key]
      break
    }
  }

  if (responseFile) {
    const getFileDownloadUrl =
      service && service.common && service.common.getFileDownloadUrl

    getFileDownloadUrl &&
      getFileDownloadUrl().then((url) => {
        window.open(
          url + '&id=' + responseFile.attachmentId + '&type=AttachmentDemo'
        ).opener = null
      })
  } else if (file.url) {
    window.open(file.url).opener = null
  } else {
    throw new Error('[tiny Error][FileUpload]file.url must not be empty')
  }
}

export const picturefilePreview = (state) => (index) => {
  state.startPostion = index
  state.shows = true
}

export const getDeleteData = (emit) => (data) => {
  emit('remove', data)
}
