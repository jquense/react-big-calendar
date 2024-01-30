import PropTypes from 'prop-types'
import React from 'react'

const DateHeader = ({ label, localizer, date, drilldownView, onDrillDown }) => {
  const renderLabel = () => (
    <>
      <span aria-hidden="true">{label}</span>
      <span className="rbc-sr-only">
        {localizer.format(date, 'ddd MMM DD YYYY')}
      </span>
    </>
  )

  if (!drilldownView) {
    return renderLabel()
  }

  return (
    <button
      type="button"
      className="rbc-button-link"
      onClick={onDrillDown}
      role="cell"
    >
      {renderLabel()}
    </button>
  )
}

DateHeader.propTypes = {
  label: PropTypes.node,
  localizer: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date),
  drilldownView: PropTypes.string,
  onDrillDown: PropTypes.func,
  isOffRange: PropTypes.bool,
}

export default DateHeader
