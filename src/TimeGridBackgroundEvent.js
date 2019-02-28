import cn from 'classnames'
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
    continuesEarlier,
    continuesLater,
    getters,
    onClick,
    onDoubleClick,
    components: { backgroundEventWrapper: BackgroundEventWrapper },
  } = props
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)

  let userProps = getters.backgroundEventProp(event, start, end, selected)

  let { height, top, width, xOffset } = style

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
        }}
        title={
          tooltip
            ? (typeof label === 'string' ? label + ': ' : '') + tooltip
            : undefined
        }
        className={cn(
          'rbc-event',
          'rbc-background-event',
          className,
          userProps.className,
          {
            'rbc-selected': selected,
            'rbc-event-continues-earlier': continuesEarlier,
            'rbc-event-continues-later': continuesLater,
          }
        )}
      />
    </BackgroundEventWrapper>
  )
}

export default TimeGridBackgroundEvent
