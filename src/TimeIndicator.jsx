import React from 'react';

class TimeIndicator extends React.Component {
  render() {
   return (
    <div ref="timeIndicator">
      <div className="rbc-current-time-indicator" ref="timeLine" />
      <div className="rbc-current-time-display" ref="timeDisplay" />
    </div>
    );
  }

  show() {
    this.refs.timeIndicator.style.display = 'block';
  }

  hide() {
    this.refs.timeIndicator.style.display = 'none';
  }

  setTimeLineWidth(width) {
    const lineContainer = this.refs.timeLine;
    lineContainer.style.width = `${width}px`;
  }

  setCurrentTime(timeString) {
    const displayContainer = this.refs.timeDisplay;
    displayContainer.innerHTML = timeString;
  }

  positionItems(gutterWidth, offsetTop) {
    const lineContainer = this.refs.timeLine;
    const displayContainer = this.refs.timeDisplay;
    Object.assign(lineContainer.style, {left: gutterWidth, top: offsetTop});

    const top = (offsetTop - Math.round(displayContainer.offsetHeight / 2)) + 1;
    const left = (gutterWidth - displayContainer.offsetWidth) - 4; // leave some space between the text and the dot
    Object.assign(displayContainer.style, {top, left});
  }
}

export default TimeIndicator;
