import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import getOffset from 'dom-helpers/offset'
import getScrollTop from 'dom-helpers/scrollTop'
import getScrollLeft from 'dom-helpers/scrollLeft'
import * as dates from './utils/dates'

import EventCell from './EventCell'
import { isSelected } from './utils/selection'

const Popup = ({
  events,
  selected,
  getters,
  accessors,
  components,
  onSelect,
  onDoubleClick,
  onKeyPress,
  slotStart,
  slotEnd,
  localizer,
  style,
  position: { width },
  show,
  handleDragStart,
  popupOffset = 5,
  popperRef,
}) => {
  const [topOffset, setTopOffset] = useState(0)
  const [leftOffset, setLeftOffset] = useState(0)

  useLayoutEffect(() => {
    const { top, left, width, height } = getOffset(popperRef.current)
    const viewBottom = window.innerHeight + getScrollTop(window)
    const viewRight = window.innerWidth + getScrollLeft(window)
    const bottom = top + height
    const right = left + width

    if (bottom > viewBottom || right > viewRight) {
      let topOff
      let leftOff

      if (bottom > viewBottom)
        topOff = bottom - viewBottom + (popupOffset.y || +popupOffset || 0)
      if (right > viewRight)
        leftOff = right - viewRight + (popupOffset.x || +popupOffset || 0)

      setTopOffset(topOff)
      setLeftOffset(leftOff)
    }
  })

  return (
    <div
      style={{
        ...style,
        top: -topOffset,
        left: -leftOffset,
        minWidth: width + width / 2,
      }}
      className="rbc-overlay"
      ref={popperRef}
    >
      <div className="rbc-overlay-header">
        {localizer.format(slotStart, 'dayHeaderFormat')}
      </div>
      {events.map((event, idx) => (
        <EventCell
          key={idx}
          type="popup"
          event={event}
          getters={getters}
          onSelect={onSelect}
          accessors={accessors}
          components={components}
          onDoubleClick={onDoubleClick}
          onKeyPress={onKeyPress}
          continuesPrior={dates.lt(accessors.end(event), slotStart, 'day')}
          continuesAfter={dates.gte(accessors.start(event), slotEnd, 'day')}
          slotStart={slotStart}
          slotEnd={slotEnd}
          selected={isSelected(event, selected)}
          draggable={true}
          onDragStart={() => handleDragStart(event)}
          onDragEnd={() => show()}
        />
      ))}
    </div>
  )
}

Popup.propTypes = {
  position: PropTypes.object,
  popupOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ]),
  events: PropTypes.array,
  selected: PropTypes.object,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  handleDragStart: PropTypes.func,
  show: PropTypes.func,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.number,
  popperRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.Element }),
  ]),
}

/**
 * The Overlay component, of react-overlays, creates a ref that is passed to the Popup, and
 * requires proper ref forwarding to be used without error
 */
export default React.forwardRef((props, ref) => (
  <Popup popperRef={ref} {...props} />
))
