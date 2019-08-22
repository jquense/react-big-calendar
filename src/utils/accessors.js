/**
 * Retrieve via an accessor-like property
 *
 *    accessor(obj, 'name')   // => retrieves obj['name']
 *    accessor(data, func)    // => retrieves func(data)
 *    ... otherwise null
 */
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

export const wrapAccessor = acc => data => accessor(data, acc)
