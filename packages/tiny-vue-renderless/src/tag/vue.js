import { handleClose, handleClick } from './index'

export const api = ['handleClose', 'handleClick']

export const renderless = (props, hooks, { emit, parent }) => {
  return {
    handleClose: handleClose(emit),
    handleClick: handleClick({ emit, parent })
  }
}
