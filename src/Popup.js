import PropTypes from 'prop-types'
import React from 'react'
import getOffset from 'dom-helpers/query/offset'
import getScrollTop from 'dom-helpers/query/scrollTop'
import getScrollLeft from 'dom-helpers/query/scrollLeft'
import dates from './utils/dates'

import EventCell from './EventCell'
import { isSelected } from './utils/selection'

class Popup extends React.Component {
  constructor(props) {
    super(props)

    this.rootRef = React.createRef()
  }

  componentDidMount() {
    let { popupOffset = 5, overlayProps } = this.props,
      { top, left, width, height } = getOffset(overlayProps.ref.current),
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
      slotStart,
      slotEnd,
      localizer,
      overlayProps,
    } = this.props

    let { left, width, top } = this.props.position,
      topOffset = (this.state || {}).topOffset || 0,
      leftOffset = (this.state || {}).leftOffset || 0

    let { ref } = overlayProps

    let style = {
      top: Math.max(0, top - topOffset),
      left: left - leftOffset,
      minWidth: width + width / 2,
    }

    return (
      <div ref={this.rootRef} style={style} className="rbc-overlay">
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
            continuesPrior={dates.lt(accessors.end(event), slotStart, 'day')}
            continuesAfter={dates.gte(accessors.start(event), slotEnd, 'day')}
            selected={isSelected(event, selected)}
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
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.number,
  overlayProps: PropTypes.object,
}

export default Popup
