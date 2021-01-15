import React from 'react'
import PropTypes from 'prop-types'

const TimeRowGutter = ({ group, localizer }) => {
  return (
    <div className="rbc-gutter">
      {group.map((value, index) => (
        <span key={index} className="rbc-label">
          {localizer.format(value, 'timeGutterFormat')}
        </span>
      ))}
    </div>
  )
}

TimeRowGutter.propTypes = {
  group: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  localizer: PropTypes.object.isRequired,
}

export default TimeRowGutter
