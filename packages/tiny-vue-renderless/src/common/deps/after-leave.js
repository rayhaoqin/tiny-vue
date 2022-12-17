const AfterLave = 'after-leave'
const Speed = 300

export default (instance, callback, speed = Speed, once = false) => {
  if (!instance || !callback) {
    throw new Error('instance & callback is required')
  }

  let called = false

  const eventCallback = function () {
    if (called) {
      return
    }

    called = true

    if (typeof callback === 'function') {
      callback.apply(null, arguments)
    }
  }

  if (once) {
    instance.$once(AfterLave, eventCallback)
  } else {
    instance.$on(AfterLave, eventCallback)
  }

  setTimeout(eventCallback, speed + 100)
}
