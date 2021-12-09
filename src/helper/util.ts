export const isNumber = (value: any): boolean => {
  return typeof value === 'number' || /[\d.]+/i.test(value)
}

export const getColumnValue = (
  columnName: string,
  exactly = true,
  row: { [key: string]: string } = {},
  fnModifier?: (str: string) => any,
): string => {
  const removeSpace = (str: string) => str.replace(/\s+/g, '')
  let key = columnName
  if (!exactly) {
    const regExp = new RegExp(removeSpace(columnName), 'i')
    key = Object.keys(row).find((key) => regExp.test(removeSpace(key)))
  }
  const value = key in row ? row[key] : null
  return fnModifier ? fnModifier(value) : value !== null ? String(value) : null
}
