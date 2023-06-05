import transform from 'lodash/transform'

export function displayObj(obj) {
  return JSON.stringify(obj, null, 2).replace(/"|'/g, '')
}

export const capitalize = (str) => str[0].toUpperCase() + str.substr(1)

export const cleanDocletValue = (str) =>
  str.trim().replace(/^\{/, '').replace(/\}$/, '')

export function getDisplayTypeName(typeName) {
  if (typeName === 'func') {
    return 'function'
  } else if (typeName === 'bool') {
    return 'boolean'
  } else if (typeName === 'object') {
    return 'Object'
  }

  return typeName
}

export function simpleType(prop) {
  let type = prop.type || {}
  let name = getDisplayTypeName(type.name)
  let doclets = prop.doclets || {}

  switch (name) {
    case 'node':
      return 'any'
    case 'function':
      return 'Function'
    case 'elementType':
      return 'ReactClass<any>'
    case 'object':
    case 'Object':
      if (type.value) return renderObject(type.value)
      return name
    case 'array':
    case 'Array': {
      let child = simpleType({ type: type.value })

      return 'Array<' + child + '>'
    }
    case 'custom':
      return cleanDocletValue(doclets.type || name)
    default:
      return name
  }
}

export function renderObject(props) {
  return transform(
    props,
    (obj, val, key) => {
      obj[val.required ? key : key + '?'] = simpleType(val)
    },
    {}
  )
}
