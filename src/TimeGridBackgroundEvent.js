import clsx from 'clsx'
import React from 'react'

/* eslint-disable react/prop-types */
function TimeGridBackgroundEvent(props) {
  const {
    style,
    className,
    event,
    accessors,
    isRtl,
    selected,
    label,
    continuesPrior,
    continuesAfter,
    getters,
    onClick,
    onDoubleClick,
    components: {
      event: Event,
      backgroundEventWrapper: BackgroundEventWrapper,
    },
  } = props

  let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)

  let userProps = getters.backgroundEventProp(event, start, end, selected)

  let { height, top, width, xOffset } = style

  const inner = [
    <div key="1" className="rbc-event-label">
      {label}
    </div>,
    <div key="2" className="rbc-event-content">
      {Event ? <Event event={event} title={title} /> : title}
    </div>,
  ]

  return (
    <BackgroundEventWrapper type="time" {...props}>
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={{
          ...userProps.style,
          top: `${top}%`,
          height: `${height}%`,
          [isRtl ? 'right' : 'left']: `${Math.max(0, xOffset)}%`,
          width: `calc(${width}% + 10px)`,
          opacity: 0.75,
        }}
        title={
          tooltip
            ? (typeof label === 'string' ? label + ': ' : '') + tooltip
            : undefined
        }
        className={clsx(
          'rbc-event',
          'rbc-background-event',
          className,
          userProps.className,
          {
            'rbc-selected': selected,
            'rbc-event-continues-prior': continuesPrior,
            'rbc-event-continues-after': continuesAfter,
          }
        )}
      >
        {inner}
      </div>
    </BackgroundEventWrapper>
  )
}

export default TimeGridBackgroundEvent
