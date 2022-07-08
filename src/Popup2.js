import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import getOffset from 'dom-helpers/offset'
import getScrollTop from 'dom-helpers/scrollTop'
import getScrollLeft from 'dom-helpers/scrollLeft'

import useClickOutside from './hooks/useClickOutside'
import EventCell from './EventCell'
import { isSelected } from './utils/selection'

function getPosition(target, offset) {
  const { top, left, width, height } = getOffset(target)
  const viewBottom = window.innerHeight + getScrollTop(window)
  const viewRight = window.innerWidth + getScrollLeft(window)
  const bottom = top + height
  const right = left - width
  const { x, y } = offset
  const topOffset =
    bottom > viewBottom ? bottom - viewBottom + y + height : top + y + height
  const leftOffset = right > viewRight ? right - viewRight + x : left + x

  return {
    topOffset,
    leftOffset,
  }
}

function Pop({
  accessors,
  getters,
  selected,
  components,
  localizer,
  position,
  show,
  events,
  slotStart,
  slotEnd,
  onSelect,
  onDoubleClick,
  onKeyPress,
  handleDragStart,
  popperRef,
  target,
  offset,
}) {
  useClickOutside({ ref: popperRef, callback: show })
  useLayoutEffect(() => {
    const { topOffset, leftOffset } = getPosition(target, offset)
    popperRef.current.style.top = `${topOffset}px`
    popperRef.current.style.left = `${leftOffset}px`
  }, [offset.x, offset.y, target])

  const { width } = position
  const style = {
    minWidth: width + width / 2,
  }
  return (
    <div style={style} className="rbc-overlay" ref={popperRef}>
      <div className="rbc-overlay-header">
        {localizer.format(slotStart, 'dayHeaderFormat')}
      </div>
      {events.map((event, idx) => (
        <EventCell
          key={idx}
          type="popup"
          localizer={localizer}
          event={event}
          getters={getters}
          onSelect={onSelect}
          accessors={accessors}
          components={components}
          onDoubleClick={onDoubleClick}
          onKeyPress={onKeyPress}
          continuesPrior={localizer.lt(accessors.end(event), slotStart, 'day')}
          continuesAfter={localizer.gte(accessors.start(event), slotEnd, 'day')}
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

const Popup = React.forwardRef((props, ref) => (
  <Pop {...props} popperRef={ref} />
))
Popup.propTypes = {
  accessors: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  selected: PropTypes.object,
  components: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  slotStart: PropTypes.instanceOf(Date).isRequired,
  slotEnd: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  handleDragStart: PropTypes.func,
  style: PropTypes.object,
  offset: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
}
export default Popup
