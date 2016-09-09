import React from 'react';

class TimeIndicator extends React.Component {
  render() {
    const { lineWidth, text, visible, x, y } = this.props;

    const timeLineStyles = {
      left: `${x}px`,
      top: `${y}px`,
      width: `${lineWidth}px`
    };
    const timeDisplayStyles = {
      left: `${x}px`,
      top: `${y}px`
    };

    // We have to adjust the position of the time display once all alements are rendered
    setTimeout(() => { this.positionTimeDisplay(); }, 0);

    return (
      <div ref="timeIndicator" style={ { display: visible ? 'block' : 'none' } }>
        <div className="rbc-current-time-indicator" style={timeLineStyles} />
        <div className="rbc-current-time-display" style={timeDisplayStyles} ref="timeDisplay">{text}</div>
      </div>
    );
  }

  needsUpdate(newProps) {
    return Object.keys(newProps).reduce((prev, prop) => {
      return prev || newProps[prop] !== this.props[prop];
    }, false);
  }

  positionTimeDisplay() {
    const displayContainer = this.refs.timeDisplay;
    const top = (this.props.y - Math.round(displayContainer.offsetHeight / 2)) + 1;
    const left = (this.props.x - displayContainer.offsetWidth) - 4; // leave some space between the text and the dot

    Object.assign(displayContainer.style, {top, left});
  }
}

TimeIndicator.propTypes = {
  /**
   * Defines the width (in pixels) of the time indicator line
   */
  lineWidth: React.PropTypes.number,

  /**
   * Determines whether the TimeIndicator is displayed
   */
  visible: React.PropTypes.bool,

  /**
   * X offset at which the TimeIndicator will be displayed
   */
  x: React.PropTypes.number,

  /**
   * Y offset at which the TimeIndicator will be displayed
   */
  y: React.PropTypes.number
};

TimeIndicator.defaultProps = {
  lineWidth: 0,
  text: '',
  visible: false,
  x: 0,
  y: 0
};

export default TimeIndicator;
