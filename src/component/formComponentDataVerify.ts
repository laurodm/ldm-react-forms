export function isADateRangeValue(value: any) {
  if (
    typeof value !== 'object' ||
    !Object.keys(value).includes('startDate') ||
    !Object.keys(value).includes('finalDate')
  ) {
    return false
  }
  return true
}
