import staticStrUndefined from '../static/staticStrUndefined'
import staticDocument from '../static/staticDocument'
import staticWindow from '../static/staticWindow'
import assign from '../object/assign'
import arrayEach from '../array/arrayEach'
function isBrowseStorage(storage) {
  try {
    let testKey = '__tiny_t'

    storage.setItem(testKey, 1)
    storage.removeItem(testKey)

    return true
  } catch (e) {
    return false
  }
}

function isBrowseType(type) {
  return navigator.userAgent.indexOf(type) > -1
}

/**
 * 获取浏览器内核
 * @return Object
 */
function browse() {
  let $body, isChrome, isEdge
  let isMobile = false
  let result = {
    isNode: false,
    isMobile: isMobile,
    isPC: false,
    isDoc: !!staticDocument
  }

  if (!staticWindow && typeof process !== staticStrUndefined) {
    result.isNode = true
  } else {
    isEdge = isBrowseType('Edge')
    isChrome = isBrowseType('Chrome')
    isMobile = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/.test(
      navigator.userAgent
    )

    if (result.isDoc) {
      $body = staticDocument.body || staticDocument.documentElement
      arrayEach(['webkit', 'khtml', 'moz', 'ms', 'o'], function (core) {
        result['-' + core] = !!$body[core + 'MatchesSelector']
      })
    }

    assign(result, {
      edge: isEdge,
      firefox: isBrowseType('Firefox'),
      msie: !isEdge && result['-ms'],
      safari: !isChrome && !isEdge && isBrowseType('Safari'),
      isMobile: isMobile,
      isPC: !isMobile,
      isLocalStorage: isBrowseStorage(staticWindow.localStorage),
      isSessionStorage: isBrowseStorage(staticWindow.sessionStorage)
    })
  }

  return result
}

export default browse
