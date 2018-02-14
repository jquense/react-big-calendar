import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import EventCell from './EventCell'
import getHeight from 'dom-helpers/query/height'
import { accessor, elementType } from './utils/propTypes'
import { segStyle } from './utils/eventLevels'
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

  renderSpan(props, len, key, content = ' ') {
    let { slots } = props

    return (
      <div
        key={key}
        className="rbc-row-segment"
        style={segStyle(Math.abs(len), slots)}
      >
        {content}
      </div>
    )
  },

  getRowHeight() {
    getHeight(findDOMNode(this))
  },
}
