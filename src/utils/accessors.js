export function accessor(data, field) {
  var value = null

  if (typeof field === 'function') value = field(data)
  else if (
    typeof field === 'string' &&
    typeof data === 'object' &&
    data != null &&
    field in data
  )
    value = data[field]

  return value
}
