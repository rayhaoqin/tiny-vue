import {
  computedShowHeader,
  computedShowAside,
  computedShowFooter,
  computedHeaderStyle,
  computedAsideStyle,
  computedMainStyle,
  computedFooterStyle
} from './index'

export const api = ['state']

export const renderless = (props, { computed, reactive }, { constants }) => {
  const api = {}
  const state = reactive({
    showAside: computed(() => api.computedShowAside()),
    showHeader: computed(() => api.computedShowHeader()),
    showFooter: computed(() => api.computedShowFooter()),
    mainStyle: computed(() => api.computedMainStyle()),
    asideStyle: computed(() => api.computedAsideStyle()),
    headerStyle: computed(() => api.computedHeaderStyle()),
    footerStyle: computed(() => api.computedFooterStyle())
  })

  Object.assign(api, {
    state,
    computedShowAside: computedShowAside({ constants, props }),
    computedShowHeader: computedShowHeader({ constants, props }),
    computedShowFooter: computedShowFooter({ constants, props }),
    computedMainStyle: computedMainStyle({ constants, props }),
    computedAsideStyle: computedAsideStyle({ constants, props }),
    computedHeaderStyle: computedHeaderStyle({ constants, props }),
    computedFooterStyle: computedFooterStyle({ constants, props })
  })

  return api
}
