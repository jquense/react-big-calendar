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
    components: { event: Event, eventWrapper: EventWrapper },
  } = props
  let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)

  let userProps = getters.eventProp(event, start, end, selected)

  let { height, top, width, xOffset } = style
  const { rendering } = event
  const isBackground = rendering === 'background'
  let inner = null
  let divStyle = {
    ...userProps.style,
    top: `${top}%`,
    height: `${height}%`,
  }
  if (!isBackground) {
    inner = [
      <div key="1" className="rbc-event-label">
        {label}
      </div>,
      <div key="2" className="rbc-event-content">
        {Event ? <Event event={event} title={title} /> : title}
      </div>,
    ]
    divStyle = {
      ...divStyle,
      width: `${width}%`,
      [isRtl ? 'right' : 'left']: `${Math.max(0, xOffset)}%`,
      zIndex: 1,
    }
  } else {
    divStyle = {
      ...divStyle,
      width: '100%',
      zIndex: 0,
    }
  }

  return (
    <EventWrapper type="time" {...props}>
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={divStyle}
        title={
          tooltip
            ? (typeof label === 'string' ? label + ': ' : '') + tooltip
            : undefined
        }
        className={cn('rbc-event', className, userProps.className, {
          'rbc-selected': selected,
          'rbc-event-continues-earlier': continuesEarlier,
          'rbc-event-continues-later': continuesLater,
        })}
      >
        {inner}
      </div>
    </EventWrapper>
  )
}

export default TimeGridEvent
