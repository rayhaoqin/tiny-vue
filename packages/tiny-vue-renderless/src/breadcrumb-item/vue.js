import { on, off } from '@opentiny/vue-renderless/common/deps/dom'

export const api = []

export const renderless = (props, { onMounted, onBeforeUnmount }, { refs, router }) => {
  const api = {
    linkClick() {
      const { replace, to } = props

      if (!to || !router) {
        return
      }

      replace ? router.replace(to) : router.push(to)
    }
  }

  onMounted(() => {
    on(refs.link, 'click', api.linkClick)
  })

  onBeforeUnmount(() => {
    off(refs.link, 'click', api.linkClick)
  })
}
