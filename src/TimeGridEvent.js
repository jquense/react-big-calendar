import cn from 'classnames'
import React from 'react'

/* eslint-disable react/prop-types */
function TimeGridEvent(props) {
  const {
    style,
    className,
    event,
    accessors,
    isRtl,
    selected,
    label,
    continuesEarlier,
    continuesLater,
    getters,
    onClick,
    onDoubleClick,
    step,
    components: { event: Event, eventWrapper: EventWrapper },
  } = props
  let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let ariaLabel = accessors.ariaLabel(event)
  let end = accessors.end(event)
  let start = accessors.start(event)
  let resource = accessors.resource(event)

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

  const stepLengthInMs = 1000 * 60 * step
  const previousSlotTime = new Date(
    Math.floor(start.getTime() / stepLengthInMs) * stepLengthInMs
  )

  // NOTE: subtracting 1 to floor nearest slot instead of next slot
  const nextSlotTime = new Date(
    Math.floor((end.getTime() - 1) / stepLengthInMs) * stepLengthInMs
  )

  return (
    <EventWrapper type="time" {...props}>
      <button
        type="button"
        tabIndex={0}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        data-resource-id={resource}
        data-previous-slot-time={previousSlotTime}
        data-next-slot-time={nextSlotTime}
        data-event-id={props.event && props.event.id}
        style={{
          ...userProps.style,
          top: `${top}%`,
          height: `${height}%`,
          [isRtl ? 'right' : 'left']: `${Math.max(1, xOffset + 1)}%`,
          width: `${width - 1}%`,
        }}
        title={
          tooltip
            ? (typeof label === 'string' ? label + ': ' : '') + tooltip
            : undefined
        }
        aria-label={ariaLabel}
        className={cn('rbc-event', className, userProps.className, {
          'rbc-selected': selected,
          'rbc-event-continues-earlier': continuesEarlier,
          'rbc-event-continues-later': continuesLater,
        })}
      >
        {inner}
      </button>
    </EventWrapper>
  )
}

export default TimeGridEvent
