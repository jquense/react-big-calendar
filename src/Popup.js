import PropTypes from 'prop-types'
import React from 'react'
import getOffset from 'dom-helpers/offset'
import getScrollTop from 'dom-helpers/scrollTop'
import getScrollLeft from 'dom-helpers/scrollLeft'
import * as dates from './utils/dates'

import EventCell from './EventCell'
import { isSelected } from './utils/selection'

class Popup extends React.Component {
  componentDidMount() {
    let { popupOffset = 5, popperRef } = this.props,
      { top, left, width, height } = getOffset(popperRef.current),
      viewBottom = window.innerHeight + getScrollTop(window),
      viewRight = window.innerWidth + getScrollLeft(window),
      bottom = top + height,
      right = left + width

    if (bottom > viewBottom || right > viewRight) {
      let topOffset, leftOffset

      if (bottom > viewBottom)
        topOffset = bottom - viewBottom + (popupOffset.y || +popupOffset || 0)
      if (right > viewRight)
        leftOffset = right - viewRight + (popupOffset.x || +popupOffset || 0)

      this.setState({ topOffset, leftOffset }) //eslint-disable-line
    }
  }

  render() {
    let {
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
      popperRef,
    } = this.props

    let { width } = this.props.position,
      topOffset = (this.state || {}).topOffset || 0,
      leftOffset = (this.state || {}).leftOffset || 0

    let style = {
      top: -topOffset,
      left: -leftOffset,
      minWidth: width + width / 2,
    }

    return (
      <div
        style={{ ...this.props.style, ...style }}
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
            onDragStart={() => this.props.handleDragStart(event)}
            onDragEnd={() => this.props.show()}
          />
        ))}
      </div>
    )
  }
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
