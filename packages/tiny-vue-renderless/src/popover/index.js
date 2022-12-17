import { on, off, addClass, removeClass } from '@opentiny/vue-renderless/common/deps/dom'
import { guid } from '@opentiny/vue-renderless/common/string'
import { KEY_CODE } from '@opentiny/vue-renderless/common'

/* istanbul ignore next */
export const mounted = ({ api, state, constants, props }) => () => {
  state.mounted = true

  const { referenceElm, popperElm, tooltipId } = state

  if (referenceElm) {
    addClass(referenceElm, `${constants.IDPREFIX}__reference`)

    referenceElm.setAttribute('aria-describedby', tooltipId)
    referenceElm.setAttribute('tabindex', props.tabindex)
    popperElm.setAttribute('tabindex', 0)

    if (props.trigger !== 'click') {
      on(referenceElm, 'focusin', () => {
        api.handleFocus()

        const instance = referenceElm.__vue__

        if (instance && typeof instance.focus === 'function') {
          instance.focus()
        }
      })

      on(popperElm, 'focusin', api.handleFocus)
      on(referenceElm, 'focusout', api.handleBlur)
      on(popperElm, 'focusout', api.handleBlur)
    }

    on(referenceElm, 'keydown', api.handleKeydown)
    on(referenceElm, 'click', api.handleClick)
  }

  if (props.trigger === 'click') {
    on(referenceElm, 'click', api.doToggle)
    on(document, 'click', api.handleDocumentClick)
  } else if (props.trigger === 'hover') {
    on(referenceElm, 'mouseenter', api.handleMouseEnter)
    on(popperElm, 'mouseenter', api.handleMouseEnter)
    on(referenceElm, 'mouseleave', api.handleMouseLeave)
    on(popperElm, 'mouseleave', api.handleMouseLeave)
  } else if (props.trigger === 'focus') {
    if (referenceElm.querySelector('input, textarea')) {
      on(referenceElm, 'focusin', api.doShow)
      on(referenceElm, 'focusout', api.doClose)
    } else {
      on(referenceElm, 'mousedown', api.doShow)
      on(referenceElm, 'mouseup', api.doClose)
    }
  }
}

export const doToggle = (state) => () => {
  state.showPopper = !state.showPopper
}

export const doShow = (state) => () => {
  state.showPopper = true
}

export const doClose = (state) => () => {
  state.showPopper = false
}

export const handleFocus = ({ props, state }) => () => {
  addClass(state.referenceElm, 'focusing')

  if (props.trigger === 'click' || props.trigger === 'focus') {
    state.showPopper = true
  }
}

/* istanbul ignore next */
export const handleClick = (state) => () => {
  removeClass(state.referenceElm, 'focusing')
}

export const handleBlur = ({ props, state }) => () => {
  removeClass(state.referenceElm, 'focusing')

  if (props.trigger === 'click' || props.trigger === 'focus') {
    state.showPopper = false
  }
}

export const handleMouseEnter = ({ props, state }) => () => {
  clearTimeout(state.timer)

  if (props.openDelay) {
    state.timer = setTimeout(() => {
      state.showPopper = true
    }, props.openDelay)
  } else {
    state.showPopper = true
  }
}

export const handleKeydown = ({ api, props }) => (event) => {
  if (event.keyCode === KEY_CODE.Escape && props.trigger !== 'manual') {
    api.doClose()
  }
}

export const handleMouseLeave = ({ props, state }) => () => {
  clearTimeout(state.timer)

  if (props.closeDelay) {
    state.timer = setTimeout(() => {
      state.showPopper = false
    }, props.closeDelay)
  } else {
    state.showPopper = false
  }
}

/* istanbul ignore next */
export const handleDocumentClick = ({ refs, state }) => (event) => {
  const reference = state.referenceElm
  const popperElm = state.popperElm
  const $el = refs.root

  if (
    !$el ||
    !reference ||
    $el.contains(event.target) ||
    reference.contains(event.target) ||
    !popperElm ||
    popperElm.contains(event.target)
  ) {
    return
  }

  state.showPopper = false
}

export const handleAfterEnter = (emit) => () => {
  emit('after-enter')
}

export const handleAfterLeave = ({ emit, api }) => () => {
  emit('after-leave')
  api.doDestroy()
}

export const cleanup = ({ props, state }) => () => {
  if (props.openDelay) {
    clearTimeout(state.timer)
  }
}

/* istanbul ignore next */
export const destroyed = ({ state, api }) => () => {
  const reference = state.referenceElm

  off(reference, 'click', api.doToggle)
  off(reference, 'mouseup', api.doClose)
  off(reference, 'mousedown', api.doShow)
  off(reference, 'focusin', api.doShow)
  off(reference, 'focusout', api.doClose)
  off(reference, 'mousedown', api.doShow)
  off(reference, 'mouseup', api.doClose)
  off(reference, 'mouseleave', api.handleMouseLeave)
  off(reference, 'mouseenter', api.handleMouseEnter)
  off(document, 'click', api.handleDocumentClick)
}

export const computedTooltipId = (constants) => () => `${constants.IDPREFIX}-${guid('', 4)}`

export const wrapMounted = ({ api, props, refs, state }) => () => {
  const { reference, popper, wrapper } = refs
  const referenceElm = (state.referenceElm = props.reference || reference)

  state.popperElm = state.popperEl || popper

  if (!referenceElm && wrapper.children) {
    state.referenceElm = wrapper.children[0] || wrapper
  }

  state.referenceElm && api.mounted()
}
