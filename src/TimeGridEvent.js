import clsx from 'clsx'
import React from 'react'

function stringifyPercent(v) {
  return typeof v === 'string' ? v : v + '%'
}

/* eslint-disable react/prop-types */
function TimeGridEvent(props) {
  const {
    style,
    className,
    event,
    accessors,
    rtl,
    selected,
    label,
    continuesEarlier,
    continuesLater,
    getters,
    onClick,
    onDoubleClick,
    isBackgroundEvent,
    onKeyPress,
    components: { event: Event, eventWrapper: EventWrapper },
  } = props
  let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)

  let userProps = getters.eventProp(event, start, end, selected)

  let { height, top, width, xOffset } = style
  const inner = [
    <div key="1" className="rbc-event-label">
      {label}
    </div>,
    <div key="2" className="rbc-event-content">
      {Event ? <Event event={event} title={title} /> : title}
    </div>,
  ]

  const eventStyle = isBackgroundEvent
    ? {
        ...userProps.style,
        top: stringifyPercent(top),
        height: stringifyPercent(height),
        // Adding 10px to take events container right margin into account
        width: `calc(${width} + 10px)`,
        [rtl ? 'right' : 'left']: stringifyPercent(Math.max(0, xOffset)),
      }
    : {
        ...userProps.style,
        top: stringifyPercent(top),
        width: stringifyPercent(width),
        height: stringifyPercent(height),
        [rtl ? 'right' : 'left']: stringifyPercent(xOffset),
      }

  return (
    <EventWrapper type="time" {...props}>
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={eventStyle}
        onKeyPress={onKeyPress}
        title={
          tooltip
            ? (typeof label === 'string' ? label + ': ' : '') + tooltip
            : undefined
        }
        className={clsx(
          isBackgroundEvent ? 'rbc-background-event' : 'rbc-event',
          className,
          userProps.className,
          {
            'rbc-selected': selected,
            'rbc-event-continues-earlier': continuesEarlier,
            'rbc-event-continues-later': continuesLater,
          }
        )}
      >
        {inner}
      </div>
    </EventWrapper>
  )
}

export default TimeGridEvent
