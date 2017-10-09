import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';

import dates from './utils/dates';
import { accessor, elementType } from './utils/propTypes';
import { accessor as get } from './utils/accessors';
import ResizableMonthEvent from '../src/addons/dragAndDrop/ResizableMonthEvent';

let propTypes = {
  event: PropTypes.object.isRequired,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.instanceOf(Date),

  selected: PropTypes.bool,
  eventPropGetter: PropTypes.func,
  titleAccessor: accessor,
  allDayAccessor: accessor,
  startAccessor: accessor,
  endAccessor: accessor,

  eventComponent: elementType,
  eventWrapperComponent: elementType.isRequired,
  onSelect: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onInlineEditEventTitle: PropTypes.func.isRequired,
};

class EventCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingEventTitle: false,
      title: get(props.event, props.titleAccessor),
    };
  }

  handleEditing = () => {
    this.setState({ isEditingEventTitle: true });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ title: value });
  };

  handleKeyPress = e => {
    const { onInlineEditEventTitle } = this.props;
    if (e.key == 'Enter') {
      onInlineEditEventTitle(this.state.title);
      this.setState({ isEditingEventTitle: false });
    }
  };

  handleBlur = () => {
    this.setState({ isEditingEventTitle: false });
  };

  render() {
    let {
      className,
      endAccessor,
      event,
      eventComponent: Event,
      eventPropGetter,
      eventWrapperComponent: EventWrapper,
      onDoubleClick,
      onSelect,
      resizable,
      selected,
      slotEnd,
      slotStart,
      startAccessor,
      titleAccessor,
      onInlineEditEventTitle,
      ...props
    } = this.props;

    let title = get(event, titleAccessor),
      end = get(event, endAccessor),
      start = get(event, startAccessor),
      isAllDay = get(event, props.allDayAccessor),
      continuesPrior = dates.lt(start, slotStart, 'day'),
      continuesAfter = dates.gte(end, slotEnd, 'day');

    if (eventPropGetter)
      var { style, className: xClassName } = eventPropGetter(event, start, end, selected);

    if (resizable) {
      Event = ResizableMonthEvent;
    }

    return (
      <EventWrapper event={event}>
        <div
          style={{ ...props.style, ...style }}
          className={cn('rbc-event', className, xClassName, {
            'rbc-selected': selected,
            'rbc-event-allday': isAllDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1,
            'rbc-event-continues-prior': continuesPrior,
            'rbc-event-continues-after': continuesAfter,
          })}
          onClick={e => onSelect(event, e)}
          /*onDoubleClick={e => onDoubleClick(event, e)}*/
          onDoubleClick={this.handleEditing}
        >
          <div className="rbc-event-content" title={title}>
            {Event && !this.state.isEditingEventTitle ? (
              <Event event={event} title={title} />
            ) : this.state.isEditingEventTitle ? (
              <input
                type="text"
                style={{ color: 'black' }}
                value={this.state.title}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                onBlur={this.handleBlur}
              />
            ) : (
              title
            )}
          </div>
        </div>
      </EventWrapper>
    );
  }
}

EventCell.propTypes = propTypes;

EventCell.defaultProps = {
  onInlineEditEventTitle: () => {},
};

export default EventCell;
