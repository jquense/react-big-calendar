import React from 'react'
import PropTypes from 'prop-types'

export default function Enum({ enumType = {} }) {
  const enumValues = enumType.value || []
  if (!Array.isArray(enumValues)) return enumValues

  const renderedEnumValues = []
  enumValues.forEach(({ value }, i) => {
    if (i > 0) {
      renderedEnumValues.push(<span key={`${i}c`}> | </span>)
    }

    renderedEnumValues.push(<code key={i}>{value}</code>)
  })

  return <span>{renderedEnumValues}</span>
}

Enum.propTypes = {
  enumType: PropTypes.object,
}
