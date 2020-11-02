import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import * as dates from './utils/dates'
import noop from './utils/noop'

const EventCell = props => {
  const {
    style,
    className,
    event,
    selected,
    isAllDay,
    // default to noop's so we don't have to check if they're defined
    onSelect = noop,
    onDoubleClick = noop,
    onKeyPress = noop,
    localizer,
    continuesPrior,
    continuesAfter,
    accessors,
    getters,
    children,
    components: { event: Event, eventWrapper: EventWrapper },
    slotStart,
    slotEnd,
    ...otherProps
  } = props
  const title = accessors.title(event)
  const tooltip = accessors.tooltip(event)
  const end = accessors.end(event)
  const start = accessors.start(event)
  const allDay = accessors.allDay(event)

  const showAsAllDay =
    isAllDay || allDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1

  const userProps = getters.eventProp(event, start, end, selected)

  const content = (
    <div className="rbc-event-content" title={tooltip || undefined}>
      {Event ? (
        <Event
          event={event}
          continuesPrior={continuesPrior}
          continuesAfter={continuesAfter}
          title={title}
          isAllDay={allDay}
          localizer={localizer}
          slotStart={slotStart}
          slotEnd={slotEnd}
        />
      ) : (
        title
      )}
    </div>
  )

  // props defaulted to noop, so don't have to see if passed
  const handleClick = e => onSelect(event, e)
  const handleDoubleClick = e => onDoubleClick(event, e)
  const handleKeyPress = e => onKeyPress(event, e)

  return (
    <EventWrapper {...props} type="date">
      <div
        {...otherProps}
        tabIndex={0}
        style={{ ...userProps.style, ...style }}
        className={clsx('rbc-event', className, userProps.className, {
          'rbc-selected': selected,
          'rbc-event-allday': showAsAllDay,
          'rbc-event-continues-prior': continuesPrior,
          'rbc-event-continues-after': continuesAfter,
        })}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyPress={handleKeyPress}
      >
        {typeof children === 'function' ? children(content) : content}
      </div>
    </EventWrapper>
  )
}

EventCell.propTypes = {
  event: PropTypes.object.isRequired,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.instanceOf(Date),

  selected: PropTypes.bool,
  isAllDay: PropTypes.bool,
  continuesPrior: PropTypes.bool,
  continuesAfter: PropTypes.bool,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object,

  onSelect: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onKeyPress: PropTypes.func,
}

export default EventCell
