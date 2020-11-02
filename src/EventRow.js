import PropTypes from 'prop-types'
import clsx from 'clsx'
import React from 'react'
import EventRowMixin from './EventRowMixin'

const EventRow = props => {
  const {
    segments = [],
    slotMetrics: { slots },
    className,
  } = props
  let lastEnd = 1

  return (
    <div className={clsx(className, 'rbc-row')}>
      {segments.reduce((row, { event, left, right, span }, li) => {
        const key = `_lvl_${li}`
        const gap = left - lastEnd

        let content = EventRowMixin.renderEvent(props, event)

        if (gap) row.push(EventRowMixin.renderSpan(slots, gap, `${key}_gap`))

        row.push(EventRowMixin.renderSpan(slots, span, key, content))

        lastEnd = right + 1

        return row
      }, [])}
    </div>
  )
}

EventRow.propTypes = {
  segments: PropTypes.array,
  ...EventRowMixin.propTypes,
}

export default EventRow
