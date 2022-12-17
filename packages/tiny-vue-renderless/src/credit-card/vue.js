import { cardType, changeFocus, getIsNumberMasked, changePlaceholder, focus, blur, toggleEvent } from './index'

export const api = ['state', 'changeFocus', 'getIsNumberMasked', 'changePlaceholder']

const initState = ({ reactive, props, computed }) => {
  const state = reactive({
    isFocused: false,
    currentFocus: null,
    isCardFlipped: false,
    focusElementStyle: null,
    currentPlaceholder: '',
    amexCardPlaceholder: '#### ###### #####',
    dinersCardPlaceholder: '#### ###### ####',
    defaultCardPlaceholder: '#### #### #### ####',
    cardType: computed(() => cardType(props.labels.cardNumber))
  })

  return state
}

const initApi = ({ api, state, props, refs, nextTick }) => {
  Object.assign(api, {
    state,
    blur: blur({ props, state }),
    focus: focus({ props, state }),
    changeFocus: changeFocus({ refs, state }),
    getIsNumberMasked: getIsNumberMasked(props),
    changePlaceholder: changePlaceholder({ api, nextTick, state })
  })
}

const initWatch = ({ watch, state, api }) => {
  watch(
    () => state.currentFocus,
    () => {
      if (state.currentFocus) {
        api.changeFocus()
      } else {
        state.focusElementStyle = null
      }
    },
    { immediate: true }
  )

  watch(() => state.cardType, api.changePlaceholder, { immediate: true })
}

export const renderless = (
  props,
  { computed, onMounted, reactive, watch, onBeforeUnmount },
  { refs, nextTick, parent }
) => {
  const api = {}
  const state = initState({ reactive, props, computed })

  initApi({ api, state, props, refs, nextTick })

  initWatch({ watch, state, api })

  let fieldsEls

  onMounted(() => {
    api.changePlaceholder()

    fieldsEls = parent.$parent.$el.querySelectorAll('[data-credit-card-field]')

    toggleEvent({ api, fieldsEls, type: 'add' })
  })

  onBeforeUnmount(() => {
    toggleEvent({ api, fieldsEls, type: 'remove' })
    fieldsEls = null
  })

  return api
}
