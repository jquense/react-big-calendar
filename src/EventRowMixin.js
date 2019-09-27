import PropTypes from 'prop-types'
import React from 'react'
import EventCell from './EventCell'
import { isSelected } from './utils/selection'

/* eslint-disable react/prop-types */
export default {
  propTypes: {
    slotMetrics: PropTypes.object.isRequired,

    selected: PropTypes.object,
    isAllDay: PropTypes.bool,
    isBooking: PropTypes.bool,

    accessors: PropTypes.object.isRequired,
    localizer: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    getters: PropTypes.object.isRequired,

    onSelect: PropTypes.func,
    onDoubleClick: PropTypes.func,
  },

  defaultProps: {
    segments: [],
    selected: {},
  },

  renderEvent(props, event) {
    let {
      selected,
      isAllDay: _,
      accessors,
      getters,
      onSelect,
      onDoubleClick,
      localizer,
      slotMetrics,
      components,
      isBooking,
    } = props

    let continuesPrior = slotMetrics.continuesPrior(event)
    let continuesAfter = slotMetrics.continuesAfter(event)

    return (
      <EventCell
        event={event}
        getters={getters}
        localizer={localizer}
        accessors={accessors}
        isBooking={isBooking}
        components={components}
        onSelect={onSelect}
        onDoubleClick={onDoubleClick}
        continuesPrior={continuesPrior}
        continuesAfter={continuesAfter}
        slotStart={slotMetrics.first}
        slotEnd={slotMetrics.last}
        selected={isSelected(event, selected)}
      />
    )
  },

  renderSpan(isBooking, slots, len, left, right, key, content = ' ') {
    let per,
      mar = 0
    if (isBooking) {
      // if (content !== ' ') {
      //   if (right == 7) {
      //     per = (Math.abs(len) / slots) * 100 - 7 + '%'
      //   } else if (left == 1) {
      //     mar = 30
      //   } else if (len == 1) {
      //     per = (Math.abs(len) / slots) * 100 + '%'
      //   } else {
      //     per = (Math.abs(len) / slots) * 100 + 3 + '%'
      //   }
      // } else {
      //   console.log('no-content', len)
      //   per = (Math.abs(len) / slots) * 100 + 10 + '%'
      // }
      per = (Math.abs(len) / slots) * 100 + '%'
    } else {
      per = (Math.abs(len) / slots) * 100 + '%'
    }

    return (
      <div
        key={key}
        className="rbc-row-segment"
        // IE10/11 need max-width. flex-basis doesn't respect box-sizing
        style={{
          WebkitFlexBasis: per,
          flexBasis: per,
          maxWidth: per,
          marginLeft: mar,
        }}
      >
        {content}
      </div>
    )
  },
}
