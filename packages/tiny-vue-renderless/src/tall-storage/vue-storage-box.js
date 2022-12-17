import { addMemory, searchMemory, selectedMemory } from './index'

export default ({ api, props, reactive, toRefs }) => {
  const state = reactive({
    storageData: [],
    isMemoryStorage: false
  })

  return {
    ...toRefs(state),
    addMemory: addMemory(props),
    searchMemory: searchMemory({ props, state }),
    selectedMemory: selectedMemory({ api, state })
  }
}
