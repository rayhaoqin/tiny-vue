export const clickList = ({ emit, props }) => () => {
  const list = {
    id: props.id,
    content: props.content,
    subtext: props.subText,
    contentdes: props.contentDes
  }

  emit('click', list)
}
