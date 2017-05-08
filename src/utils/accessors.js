const SUFFIX = 'Accessor';

export function accessor(data, field) {
  var value = null;

  if (typeof field === 'function')
    value = field(data)
  else if (typeof field === 'string' && typeof data === 'object' && data != null && field in data)
    value = data[field]

  return value
}

export function createAccessors(accessors) {
  let result = {}
  Object.keys(accessors).forEach(key => {
    let idx = key.indexOf(SUFFIX);
    if (idx !== (key.length - SUFFIX.length)) return;

    let value = accessors[key];
    result[key.substring(0, idx)] = (d => accessor(d, value))
  })
  return result;
}
