import staticStrUndefined from './staticStrUndefined'

let staticWindow = typeof window === staticStrUndefined ? 0 : window

export default staticWindow
