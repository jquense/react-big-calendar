import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import EventRowMixin from './EventRowMixin'
import { eventLevels } from './utils/eventLevels'
import range from 'lodash/range'

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot
let eventsInSlot = (segments, slot) =>
  segments.filter((seg) => isSegmentInSlot(seg, slot)).map((seg) => seg.event)

class EventEndingRow extends React.Component {
  render() {
    let {
      segments,
      slotMetrics: { slots },
    } = this.props
    let rowSegments = eventLevels(segments).levels[0]

    let current = 1,
      lastEnd = 1,
      row = []

    while (current <= slots) {
      let key = '_lvl_' + current

      let { event, left, right, span } =
        rowSegments.filter((seg) => isSegmentInSlot(seg, current))[0] || {} //eslint-disable-line

      if (!event) {
        current++
        continue
      }

      let gap = Math.max(0, left - lastEnd)

      if (this.canRenderSlotEvent(left, span)) {
        let content = EventRowMixin.renderEvent(this.props, event)

        if (gap) {
          row.push(EventRowMixin.renderSpan(slots, gap, key + '_gap'))
        }

        row.push(EventRowMixin.renderSpan(slots, span, key, content))

        lastEnd = current = right + 1
      } else {
        if (gap) {
          row.push(EventRowMixin.renderSpan(slots, gap, key + '_gap'))
        }

        row.push(
          EventRowMixin.renderSpan(
            slots,
            1,
            key,
            this.renderShowMore(segments, current)
          )
        )
        lastEnd = current = current + 1
      }
    }

    return <div className="rbc-row">{row}</div>
  }

  canRenderSlotEvent(slot, span) {
    let { segments } = this.props

    return range(slot, slot + span).every((s) => {
      const count = eventsInSlot(segments, s).length

      return count === 1
    })
  }

  renderShowMore(segments, slot) {
    let { localizer, slotMetrics } = this.props
    const events = slotMetrics.getEventsForSlot(slot)
    const remainingEvents = eventsInSlot(segments, slot)
    const count = remainingEvents.length
    return count ? (
      <button
        type="button"
        key={'sm_' + slot}
        className={clsx('rbc-button-link', 'rbc-show-more')}
        onClick={(e) => this.showMore(slot, e)}
      >
        {localizer.messages.showMore(count, remainingEvents, events)}
      </button>
    ) : (
      false
    )
  }

  showMore(slot, e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onShowMore(slot, e.target)
  }
}

EventEndingRow.propTypes = {
  segments: PropTypes.array,
  slots: PropTypes.number,
  onShowMore: PropTypes.func,
  ...EventRowMixin.propTypes,
}

EventEndingRow.defaultProps = {
  ...EventRowMixin.defaultProps,
}

export default EventEndingRow
