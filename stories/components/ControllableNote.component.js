import React from 'react'
import PropTypes from 'prop-types'
import { getDisplayTypeName, capitalize } from '../helpers/utils'

export default function ControllableNote({ controllable = false, type, name }) {
  if (!controllable) {
    return null
  }

  const isHandler = type && getDisplayTypeName(type.name) === 'function'

  const text = isHandler ? (
    <span>
      controls <code>{controllable}</code>
    </span>
  ) : (
    <span>
      controlled by: <code>{controllable}</code>, initialized with:{' '}
      <code>{'default' + capitalize(name)}</code>
    </span>
  )

  return (
    <div className="pull-right">
      <em>
        <small>{text}</small>
      </em>
    </div>
  )
}

ControllableNote.propTypes = {
  controllable: PropTypes.bool,
  type: PropTypes.object,
  name: PropTypes.string,
}
