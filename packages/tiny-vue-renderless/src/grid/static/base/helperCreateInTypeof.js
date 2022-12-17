export default function helperCreateInTypeof(type) {
  return function (obj) {
    return typeof obj === type
  }
}
