import {
  watchRules,
  computedAutoLabelWidth,
  created,
  resetFields,
  clearValidate,
  validate,
  validateField,
  getLabelWidthIndex,
  registerLabelWidth,
  deregisterLabelWidth,
  updateTip,
  bindDialogEvent
} from './index'

export const api = [
  'state',
  'resetFields',
  'clearValidate',
  'validate',
  'validateField',
  'getLabelWidthIndex',
  'registerLabelWidth',
  'deregisterLabelWidth',
  'updateTip'
]

export const renderless = (props, { computed, inject, provide, reactive, watch }, { parent }) => {
  const api = {}
  const dialog = inject('dialog', null)

  const state = reactive({
    fields: [],
    timer: null,
    potentialLabelWidthArr: [],
    autoLabelWidth: computed(() => api.computedAutoLabelWidth())
  })

  Object.assign(api, {
    state,
    updateTip: updateTip({ props, state }),
    computedAutoLabelWidth: computedAutoLabelWidth({ state }),
    created: created({ parent, state }),
    resetFields: resetFields({ props, state }),
    clearValidate: clearValidate(state),
    validate: validate({ props, state }),
    validateField: validateField(state),
    getLabelWidthIndex: getLabelWidthIndex(state),
    registerLabelWidth: registerLabelWidth({ api, state }),
    deregisterLabelWidth: deregisterLabelWidth({ api, state }),
    watchRules: watchRules({ api, props, state })
  })

  api.created()

  provide('form', parent)

  bindDialogEvent({ api, dialog, state })

  watch(() => props.rules, api.watchRules)

  return api
}
