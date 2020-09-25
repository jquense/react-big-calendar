import PropTypes from 'prop-types'
import React from 'react'
import EventRowMixin from './EventRowMixin'
import { eventLevels } from './utils/eventLevels'
import range from 'lodash/range'

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot
let eventsInSlot = (segments, slot) =>
  segments.filter(seg => isSegmentInSlot(seg, slot)).length

const EventEndingRow = props => {
  const {
    localizer,
    segments = [],
    onShowMore,
    slotMetrics: { slots },
  } = props

  const showMore = (slot, e) => {
    e.preventDefault()
    onShowMore(slot, e.target)
  }

  const canRenderSlotEvent = function(slot, span) {
    return range(slot, slot + span).every(s => {
      const count = eventsInSlot(segments, s)

      return count === 1
    })
  }

  const renderShowMore = function(segments, slot) {
    const count = eventsInSlot(segments, slot)

    if (!count) return null

    /**
     * TODO: replace href="#", as this will bork in many browsers now
     * convert to button with styling as a link
     */
    return (
      <a
        key={`sm_${slot}`}
        href="#"
        className={'rbc-show-more'}
        onClick={e => showMore(slot, e)}
      >
        {localizer.messages.showMore(count)}
      </a>
    )
  }

  const rowSegments = eventLevels(segments).levels[0]

  let current = 1
  let lastEnd = 1
  const row = []

  while (current <= slots) {
    const key = `_lvl_${current}`

    const { event, left, right, span } =
      rowSegments.filter(seg => isSegmentInSlot(seg, current))[0] || {} //eslint-disable-line

    if (!event) {
      current++
      continue
    }

    const gap = Math.max(0, left - lastEnd)

    if (canRenderSlotEvent(left, span)) {
      const content = EventRowMixin.renderEvent(props, event)

      if (gap) {
        row.push(EventRowMixin.renderSpan(slots, gap, `${key}_gap`))
      }

      row.push(EventRowMixin.renderSpan(slots, span, key, content))

      lastEnd = current = right + 1
    } else {
      if (gap) {
        row.push(EventRowMixin.renderSpan(slots, gap, key + `${key}_gap`))
      }

      row.push(
        EventRowMixin.renderSpan(
          slots,
          1,
          key,
          renderShowMore(segments, current)
        )
      )
      lastEnd = current = current + 1
    }
  }
  return <div className="rbc-row">{row}</div>
}

EventEndingRow.propTypes = {
  segments: PropTypes.array,
  slots: PropTypes.number,
  onShowMore: PropTypes.func,
  ...EventRowMixin.propTypes,
}

export default EventEndingRow
