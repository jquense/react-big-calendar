import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Overlay } from 'react-overlays'
import Popup from './Popup'

function CalOverlay({
  containerRef,
  popupOffset = 5,
  overlay,
  accessors,
  localizer,
  components,
  getters,
  selected,
  handleSelectEvent,
  handleDoubleClickEvent,
  handleKeyPressEvent,
  handleDragStart,
  onHide,
  overlayDisplay,
}) {
  const popperRef = useRef(null)
  if (!overlay.position) return null

  let offset = popupOffset
  if (!isNaN(popupOffset)) {
    offset = { x: popupOffset, y: popupOffset }
  }

  const { position, events, date, end } = overlay
  return (
    <Overlay
      rootClose
      flip
      show
      placement="bottom"
      onHide={onHide}
      target={overlay.target}
    >
      {({ props }) => (
        <Popup
          {...props}
          containerRef={containerRef}
          ref={popperRef}
          target={overlay.target}
          offset={offset}
          accessors={accessors}
          getters={getters}
          selected={selected}
          components={components}
          localizer={localizer}
          position={position}
          show={overlayDisplay}
          events={events}
          slotStart={date}
          slotEnd={end}
          onSelect={handleSelectEvent}
          onDoubleClick={handleDoubleClickEvent}
          onKeyPress={handleKeyPressEvent}
          handleDragStart={handleDragStart}
        />
      )}
    </Overlay>
  )
}

const PopOverlay = React.forwardRef((props, ref) => (
  <CalOverlay {...props} containerRef={ref} />
))

PopOverlay.propTypes = {
  popupOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  ]),
  overlay: PropTypes.shape({
    position: PropTypes.object,
    events: PropTypes.array,
    date: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }),
  accessors: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  selected: PropTypes.object,
  handleSelectEvent: PropTypes.func,
  handleDoubleClickEvent: PropTypes.func,
  handleKeyPressEvent: PropTypes.func,
  handleDragStart: PropTypes.func,
  onHide: PropTypes.func,
  overlayDisplay: PropTypes.func,
}

export default PopOverlay
