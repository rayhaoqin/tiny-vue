import { onDragOver, onDrop } from './index'

export const api = ['state', 'onDragOver', 'onDrop']

export const renderless = (props, { inject, reactive, ref }, { emit }) => {
  const state = reactive({
    dragover: false,
    uploader: inject('uploader') || ref({ default: '' })
  })

  const api = {
    state,
    onDragOver: onDragOver({ props, state }),
    onDrop: onDrop({ emit, props, state })
  }

  return api
}
