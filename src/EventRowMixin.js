import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import EventCell from './EventCell'
import getHeight from 'dom-helpers/query/height'
import { accessor, elementType } from './utils/propTypes'
import { isSelected } from './utils/selection'

/* eslint-disable react/prop-types */
export default {
  propTypes: {
    slots: PropTypes.number.isRequired,
    end: PropTypes.instanceOf(Date),
    start: PropTypes.instanceOf(Date),

    selected: PropTypes.object,
    isAllDay: PropTypes.bool,
    eventPropGetter: PropTypes.func,
    titleAccessor: accessor,
    tooltipAccessor: accessor,
    allDayAccessor: accessor,
    startAccessor: accessor,
    endAccessor: accessor,

    eventComponent: elementType,
    eventWrapperComponent: elementType.isRequired,
    onSelect: PropTypes.func,
    onDoubleClick: PropTypes.func,
  },

  defaultProps: {
    segments: [],
    selected: {},
    slots: 7,
  },

  renderEvent(props, event) {
    let {
      eventPropGetter,
      selected,
      isAllDay,
      start,
      end,
      startAccessor,
      endAccessor,
      titleAccessor,
      tooltipAccessor,
      allDayAccessor,
      eventComponent,
      eventWrapperComponent,
      onSelect,
      onDoubleClick,
    } = props

    return (
      <EventCell
        event={event}
        eventWrapperComponent={eventWrapperComponent}
        eventPropGetter={eventPropGetter}
        onSelect={onSelect}
        onDoubleClick={onDoubleClick}
        selected={isSelected(event, selected)}
        isAllDay={isAllDay}
        startAccessor={startAccessor}
        endAccessor={endAccessor}
        titleAccessor={titleAccessor}
        tooltipAccessor={tooltipAccessor}
        allDayAccessor={allDayAccessor}
        slotStart={start}
        slotEnd={end}
        eventComponent={eventComponent}
      />
    )
  },

  renderSpan(slots, len, key, content = ' ') {
    let per = Math.abs(len) / slots * 100 + '%'

    return (
      <div
        key={key}
        className="rbc-row-segment"
        // IE10/11 need max-width. flex-basis doesn't respect box-sizing
        style={{ WebkitFlexBasis: per, flexBasis: per, maxWidth: per }}
      >
        {content}
      </div>
    )
  },

  getRowHeight() {
    getHeight(findDOMNode(this))
  },
}
