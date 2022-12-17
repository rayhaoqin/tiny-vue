import staticStrUndefined from './staticStrUndefined'

let staticDocument = typeof document === staticStrUndefined ? 0 : document

export default staticDocument
