export const computedCancel = ({ constants, props, t }) => () => props.cancelButton || t(constants.CANCEL_BUTTTON_TEXT)

export const computedconfirm = ({ constants, props, t }) => () => props.saveButton || t(constants.SAVE_BUTTON_TEXT)

export const computedSetLocalTips = ({ constants, props, t }) => () => props.tips || t(constants.LOCAL_TIPS)

export const computedSetValueTitle = ({ constants, props, t }) => () => props.valueTitle || t(constants.VALUE_TITLE)

export const computedSetLocalTitle = ({ constants, props, t }) => () => props.title || t(constants.LOCAL_TITLE)

export const computedSetLabelTitle = ({ constants, props, t }) => () => props.labelTitle || t(constants.LABEL_TITLE)

export const computedSetDialogTitle = ({ constants, props, t }) => () => props.dialogTitle || t(constants.DIALOG_TITLE)

export const showDialog = (state) => () => {
  state.isShowDialog = true

  state.cloneValue = state.value.map((item) => {
    if (item.hidden != undefined) {
      return { ...item }
    } else {
      return { ...item, hidden: false }
    }
  })
}

export const closeDialog = (state) => () => {
  state.isShowDialog = false
}

export const checkAllHander = (state) => () =>
  (state.cloneValue = state.cloneValue.map((item) => ({
    ...item,
    hidden: state.checkAll
  })))

export const checkValueHiddenItem = (state) => () => {
  let hiddenItemCount = 0

  state.cloneValue.forEach((item) => {
    if (item.hidden) {
      ++hiddenItemCount
    }
  })

  if (hiddenItemCount > 0 && hiddenItemCount < state.cloneValue.length) {
    state.checkAll = false
    return true
  } else if (hiddenItemCount === 0) {
    state.checkAll = false
    return false
  } else if (hiddenItemCount === state.cloneValue.length) {
    state.checkAll = true
    return false
  }
}

export const saveHandler = ({ emit, state, alert }) => () => {
  if (state.checkAll) {
    alert({ message: state.tips, title: '', status: 'warning' })
    emit('saveWarning')
    return
  }

  state.value = state.cloneValue
  state.isShowDialog = false
}

export const watchValue = (state) => (value) => {
  state.value = value
}

export const watchTextSplit = (state) => (value) => {
  state.textSplit = value
}
