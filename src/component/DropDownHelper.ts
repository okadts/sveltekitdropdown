export type KeyValueObject = {
  [key: string]: unknown
}

export type DropDownOption = {
  value: string | number | boolean | unknown
  label: string
} & (KeyValueObject)

export type OptionsComponentProps = {
  listOptions: DropDownOption[],
  isSearch?: boolean,
  searchKeyword?: string,
  handleClickOptions: (option: DropDownOption) => void
}

export const highlightText = (text: string, keyword: string, fontColor = 'white', backgroundColor = 'red') => {
  if (!keyword) return text
  const regex = new RegExp(`(${keyword})`, 'gi')
  const parts = text.split(regex)
  const listStyle = `color: ${fontColor}; background-color: ${backgroundColor}`
  const span = parts.map((part) =>
    regex.test(part) ? `<span style="${listStyle}">${part}</span>` : part
  )
  return span.join('')
}