import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import dates from './utils/dates'
import { accessor, elementType } from './utils/propTypes'
import { accessor as get } from './utils/accessors'

let propTypes = {
  event: PropTypes.object.isRequired,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.instanceOf(Date),

  selected: PropTypes.bool,
  isAllDay: PropTypes.bool,
  eventPropGetter: PropTypes.func,
  titleAccessor: accessor,
  tooltipAccessor: accessor,
  allDayAccessor: accessor,
  startAccessor: accessor,
  endAccessor: accessor,

  eventComponent: elementType,
  eventWrapperComponent: elementType.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
}

class EventCell extends React.Component {
  render() {
    let {
      className,
      event,
      selected,
      isAllDay,
      eventPropGetter,
      startAccessor,
      endAccessor,
      titleAccessor,
      tooltipAccessor,
      allDayAccessor,
      slotStart,
      slotEnd,
      onSelect,
      onDoubleClick,
      eventComponent: Event,
      eventWrapperComponent: EventWrapper,
      ...props
    } = this.props

    let title = get(event, titleAccessor),
      tooltip = get(event, tooltipAccessor),
      end = get(event, endAccessor),
      start = get(event, startAccessor),
      allDay = get(event, allDayAccessor),
      showAsAllDay =
        isAllDay ||
        allDay ||
        dates.diff(start, dates.ceil(end, 'day'), 'day') > 1,
      continuesPrior = dates.lt(start, slotStart, 'day'),
      continuesAfter = dates.gte(end, slotEnd, 'day')

    if (eventPropGetter)
      var { style, className: xClassName } = eventPropGetter(
        event,
        start,
        end,
        selected
      )

    let wrapperProps = {
      event,
      allDay,
      continuesPrior,
      continuesAfter,
    }

    return (
      // give EventWrapper some extra info to help it determine whether it
      // it's in a row, etc. Useful for dnd, etc.
      <EventWrapper {...wrapperProps} isRow={true}>
        <div
          style={{ ...props.style, ...style }}
          className={cn('rbc-event', className, xClassName, {
            'rbc-selected': selected,
            'rbc-event-allday': showAsAllDay,
            'rbc-event-continues-prior': continuesPrior,
            'rbc-event-continues-after': continuesAfter,
          })}
          onClick={e => onSelect(event, e)}
          onDoubleClick={e => onDoubleClick(event, e)}
        >
          <div className="rbc-event-content" title={tooltip || undefined}>
            {Event ? (
              <Event event={event} title={title} isAllDay={allDay} />
            ) : (
              title
            )}
          </div>
        </div>
      </EventWrapper>
    )
  }
}

EventCell.propTypes = propTypes

export default EventCell
