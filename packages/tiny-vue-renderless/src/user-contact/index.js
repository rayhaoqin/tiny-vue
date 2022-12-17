export const getUserHref = ({ api, props }) => () => {
  let href = 'javascript:;'

  if (!props.isNewImMode) {
    const data = props.data
    const userDescription = data.userDescription ? data.userDescription.toLocaleLowerCase() : ''

    href = 'javascript:;'
  }

  return href
}
