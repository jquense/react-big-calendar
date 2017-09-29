import PropTypes from 'prop-types'
import React from 'react'
import EventRowMixin from './EventRowMixin'

class EventRow extends React.Component {
  static propTypes = {
    segments: PropTypes.array,
    ...EventRowMixin.propTypes,
  }
  static defaultProps = {
    ...EventRowMixin.defaultProps,
  }
  render() {
    let { segments } = this.props

    let lastEnd = 1

    return (
      <div className="rbc-row">
        {segments.reduce((row, { event, left, right, span }, li) => {
          let key = '_lvl_' + li
          let gap = left - lastEnd

          let content = EventRowMixin.renderEvent(this.props, event)

          if (gap)
            row.push(EventRowMixin.renderSpan(this.props, gap, key + '_gap'))

          row.push(EventRowMixin.renderSpan(this.props, span, key, content))

          lastEnd = right + 1

          return row
        }, [])}
      </div>
    )
  }
}

export default EventRow
