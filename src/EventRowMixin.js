import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';
import EventCell from './EventCell';
import getHeight from 'dom-helpers/query/height';
import { accessor, elementType } from './utils/propTypes';
import { segStyle } from './utils/eventLevels';
import { isSelected } from './utils/selection';

/* eslint-disable react/prop-types */
export default {
  propTypes: {
    slots: PropTypes.number.isRequired,
    end: PropTypes.instanceOf(Date),
    start: PropTypes.instanceOf(Date),

    selected: PropTypes.object,
    eventPropGetter: PropTypes.func,
    titleAccessor: accessor,
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
      allDayAccessor,
      end,
      endAccessor,
      eventComponent,
      eventPropGetter,
      eventWrapperComponent,
      onDoubleClick,
      onInlineEditEventTitle,
      onRightClickEvent,
      onSelect,
      selected,
      start,
      startAccessor,
      titleAccessor,
    } = props;

    return (
      <EventCell
        allDayAccessor={allDayAccessor}
        endAccessor={endAccessor}
        event={event}
        eventComponent={eventComponent}
        eventPropGetter={eventPropGetter}
        eventWrapperComponent={eventWrapperComponent}
        onDoubleClick={onDoubleClick}
        onInlineEditEventTitle={onInlineEditEventTitle}
        onRightClickEvent={this.props.onRightClickEvent}
        onSelect={onSelect}
        resizable={props.resizable}
        selected={isSelected(event, selected)}
        slotEnd={end}
        slotStart={start}
        startAccessor={startAccessor}
        titleAccessor={titleAccessor}
      />
    );
  },

  renderSpan(props, len, key, content = ' ') {
    let { slots } = props;

    return (
      <div key={key} className="rbc-row-segment" style={segStyle(Math.abs(len), slots)}>
        {content}
      </div>
    );
  },

  getRowHeight() {
    getHeight(findDOMNode(this));
  },
};
