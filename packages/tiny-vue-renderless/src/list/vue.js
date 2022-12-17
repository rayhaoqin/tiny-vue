import { clickList } from './index'

export const api = ['state', 'clickList']

export const renderless = (props, { reactive }, { emit }) => {
  const state = reactive({
    test: '1'
  })

  const api = {
    state,
    clickList: clickList({ emit, props })
  }

  return api
}
