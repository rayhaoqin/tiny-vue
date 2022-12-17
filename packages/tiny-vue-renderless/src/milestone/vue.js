import { handleClick, flagOprate, getMileIcon, getMileContent, getLineColor, handleFlagClick } from './index'

export const api = [
  'state',
  'showTip',
  'handleClick',
  'handleFlagClick',
  'flagOprate',
  'getMileIcon',
  'getMileContent',
  'getMileFlagStyle',
  'getLineColor',
  'getStatus'
]

export const renderless = (props, { reactive }, { emit, refs, constants }) => {
  const state = reactive({
    tipContent: ''
  })

  const api = {
    state,
    getLineColor: getLineColor(props),
    getMileContent: getMileContent(props),
    handleFlagClick: handleFlagClick(emit),
    handleClick: handleClick({ emit, state }),
    getMileIcon: getMileIcon({ constants, props }),
    flagOprate: flagOprate({ constants, refs, state })
  }

  return api
}
