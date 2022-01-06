import React from 'react'
import PropTypes from 'prop-types'
import {
  getDisplayTypeName,
  cleanDocletValue,
  renderObject,
  displayObj,
} from '../helpers/utils'
import Enum from './Enum.component'

export default function Type({ type = {}, doclets = {}, name: displayName }) {
  let name = getDisplayTypeName(displayName)

  switch (name) {
    case 'node':
      return 'any'
    case 'function':
      return 'Function'
    case 'elementType':
      return 'ReactClass<any>'
    case 'dateFormat':
      return 'string | (date: Date, culture: ?string, localizer: Localizer) => string'
    case 'dateRangeFormat':
      return '(range: { start: Date, end: Date }, culture: ?string, localizer: Localizer) => string'
    case 'object':
    case 'Object':
      if (type.value)
        return (
          <pre className="shape-prop">
            {displayObj(renderObject(type.value))}
          </pre>
        )

      return name
    case 'union':
      return type.value.reduce((current, val, i, list) => {
        val = typeof val === 'string' ? { name: val } : val
        let item = Type({ type: val })
        if (React.isValidElement(item)) {
          item = React.cloneElement(item, { key: i })
        }
        current = current.concat(item)

        return i === list.length - 1 ? current : current.concat(' | ')
      }, [])
    case 'array':
      return (
        <span>
          {'Array<'}
          <Type type={type.value} />
          {'>'}
        </span>
      )
    case 'enum':
      return <Enum enumType={type} />
    case 'custom':
      return cleanDocletValue(doclets.type || name)
    default:
      return name
  }
}

Type.propTypes = {
  name: PropTypes.string,
  type: PropTypes.object,
  doclets: PropTypes.object,
}
