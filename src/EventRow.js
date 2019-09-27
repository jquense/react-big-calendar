import PropTypes from 'prop-types'
import clsx from 'clsx'
import React from 'react'
import EventRowMixin from './EventRowMixin'

class EventRow extends React.Component {
  render() {
    let {
      segments,
      slotMetrics: { slots },
      className,
      isBooking,
    } = this.props

    let lastEnd = 1

    return (
      <div className={clsx(className, 'rbc-row')}>
        {segments.reduce((row, { event, left, right, span }, li) => {
          let key = '_lvl_' + li
          let gap = left - lastEnd

          // console.log('gap', gap)
          // console.log('event', event)
          // console.log('left', left)
          // console.log('right', right)
          // console.log('span', span)
          // console.log('li', li)
          // console.log('isBooking', isBooking)

          let content = EventRowMixin.renderEvent(this.props, event)

          if (gap)
            row.push(
              EventRowMixin.renderSpan(
                isBooking,
                slots,
                gap,
                left,
                right,
                `${key}_gap`
              )
            )

          row.push(
            EventRowMixin.renderSpan(
              isBooking,
              slots,
              span,
              left,
              right,
              key,
              content
            )
          )

          lastEnd = right + 1

          return row
        }, [])}
      </div>
    )
  }
}

EventRow.propTypes = {
  segments: PropTypes.array,
  ...EventRowMixin.propTypes,
}

EventRow.defaultProps = {
  ...EventRowMixin.defaultProps,
}

export default EventRow
