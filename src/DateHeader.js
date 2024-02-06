import PropTypes from 'prop-types'
import React from 'react'

const DateHeaderLabel = (label, localizer, date) => (
  <>
    <span aria-hidden="true">{label}</span>
    <span className="rbc-sr-only">
      {localizer.format(date, 'ddd MMM DD YYYY')}
    </span>
  </>
)

const DateHeader = ({ label, localizer, date, drilldownView, onDrillDown }) => {
  if (!drilldownView) {
    return <DateHeaderLabel label={label} date={date} localizer={localizer} />
  }

  return (
    <button
      type="button"
      className="rbc-button-link"
      onClick={onDrillDown}
      role="cell"
    >
      <DateHeaderLabel label={label} date={date} localizer={localizer} />
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
