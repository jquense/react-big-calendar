import cn from 'classnames';
import getHeight from 'dom-helpers/query/height';
import qsa from 'dom-helpers/query/querySelectorAll';
import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';

import dates from './utils/dates';
import { accessor, elementType } from './utils/propTypes';
import { segStyle, eventSegments, endOfRange, eventLevels } from './utils/eventLevels';
import BackgroundCells from './BackgroundCells';
import EventRow from './EventRow';
import EventEndingRow from './EventEndingRow';

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot;

const propTypes = {
  date: PropTypes.instanceOf(Date),
  events: PropTypes.array.isRequired,
  range: PropTypes.array.isRequired,

  rtl: PropTypes.bool,
  renderForMeasure: PropTypes.bool,
  renderHeader: PropTypes.func,

  container: PropTypes.func,
  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  onShowMore: PropTypes.func,
  onSelectSlot: PropTypes.func,
  onRightClickSlot: PropTypes.func,
  onSelectEnd: PropTypes.func,
  onSelectStart: PropTypes.func,

  now: PropTypes.instanceOf(Date).isRequired,
  startAccessor: accessor.isRequired,
  endAccessor: accessor.isRequired,

  dateCellWrapper: elementType,
  eventComponent: elementType,
  eventWrapperComponent: elementType.isRequired,
  minRows: PropTypes.number.isRequired,
  maxRows: PropTypes.number.isRequired,
};

const defaultProps = {
  minRows: 0,
  maxRows: Infinity,
};

class DateContentRow extends React.Component {
  constructor(...args) {
    super(...args);
  }

  handleSelectSlot = slot => {
    const { range, onSelectSlot } = this.props;

    onSelectSlot(range.slice(slot.start, slot.end + 1), slot);
  };

  handleRightClickSlot = slot => {
    const { range, onRightClickSlot } = this.props;

    onRightClickSlot(range.slice(slot.start, slot.end + 1), slot);
  };

  handleShowMore = slot => {
    const { range, onShowMore } = this.props;
    let row = qsa(findDOMNode(this), '.rbc-row-bg')[0];

    let cell;
    if (row) cell = row.children[slot - 1];

    let events = this.segments.filter(seg => isSegmentInSlot(seg, slot)).map(seg => seg.event);

    onShowMore(events, range[slot - 1], cell, slot);
  };

  createHeadingRef = r => {
    this.headingRow = r;
  };

  createEventRef = r => {
    this.eventRow = r;
  };

  getContainer = () => {
    const { container } = this.props;
    return container ? container() : findDOMNode(this);
  };

  getRowLimit() {
    let eventHeight = getHeight(this.eventRow);
    let headingHeight = this.headingRow ? getHeight(this.headingRow) : 0;
    let eventSpace = getHeight(findDOMNode(this)) - headingHeight;

    return Math.max(Math.floor(eventSpace / eventHeight), 1);
  }

  renderHeadingCell = (date, index) => {
    let { renderHeader, range } = this.props;

    return renderHeader({
      date,
      key: `header_${index}`,
      style: segStyle(1, range.length),
      className: cn(
        'rbc-date-cell',
        dates.eq(date, this.props.now, 'day') && 'rbc-now', // FIXME use props.now
      ),
    });
  };

  renderDummy = () => {
    let { className, range, renderHeader } = this.props;
    return (
      <div className={className}>
        <div className="rbc-row-content">
          {renderHeader && (
            <div className="rbc-row" ref={this.createHeadingRef}>
              {range.map(this.renderHeadingCell)}
            </div>
          )}
          <div className="rbc-row" ref={this.createEventRef}>
            <div className="rbc-row-segment" style={segStyle(1, range.length)}>
              <div className="rbc-event">
                <div className="rbc-event-content">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      date,
      rtl,
      events,
      range,
      className,
      selectable,
      renderForMeasure,
      startAccessor,
      endAccessor,
      renderHeader,
      minRows,
      maxRows,
      dateCellWrapper,
      eventComponent,
      eventWrapperComponent,
      onSelectStart,
      onSelectEnd,
      longPressThreshold,
      ...props
    } = this.props;

    const onSelectEvent = this.props.onSelect;

    if (renderForMeasure) return this.renderDummy();

    const { levels, first, last, extra } = this.props;

    return (
      <div className={className}>
        <BackgroundCells
          date={date}
          rtl={rtl}
          range={range}
          selectable={selectable}
          container={this.getContainer}
          onSelectEvent={onSelectEvent}
          onSelectStart={onSelectStart}
          onSelectEnd={onSelectEnd}
          onSelectSlot={this.handleSelectSlot}
          onRightClickSlot={this.handleRightClickSlot}
          cellWrapperComponent={dateCellWrapper}
          longPressThreshold={longPressThreshold}
        />

        <div className="rbc-row-content">
          {renderHeader && (
            <div className="rbc-row" ref={this.createHeadingRef}>
              {range.map(this.renderHeadingCell)}
            </div>
          )}
          {levels.map((segs, idx) => (
            <EventRow
              {...props}
              end={last}
              endAccessor={endAccessor}
              eventComponent={eventComponent}
              eventWrapperComponent={eventWrapperComponent}
              key={idx}
              onInlineEditEventTitle={this.props.onInlineEditEventTitle}
              segments={segs}
              slots={range.length}
              start={first}
              startAccessor={startAccessor}
            />
          ))}
          {!!extra.length && (
            <EventEndingRow
              {...props}
              start={first}
              end={last}
              segments={extra}
              onShowMore={this.handleShowMore}
              eventComponent={eventComponent}
              eventWrapperComponent={eventWrapperComponent}
            />
          )}
        </div>
      </div>
    );
  }
}

DateContentRow.propTypes = propTypes;
DateContentRow.defaultProps = defaultProps;

export default DateContentRow;
