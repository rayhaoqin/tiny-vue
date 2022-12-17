export const computedFormItemSize = (props) => () => (props.formItem || {}).formItemSize

export const computedCheckboxGroupSize = ({ props, formItemSize }) => () => props.size || formItemSize.value
