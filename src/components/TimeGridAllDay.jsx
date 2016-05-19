import React, { PropTypes, Component } from 'react'
import message from '../utils/messages';
import dates from '../utils/dates';

import SelectableBackgroundCells from '../containers/SelectableBackgroundCells.jsx'

export default class TimeGridAllDay extends Component {
  static propTypes = {
    messages: React.PropTypes.array,
    end: PropTypes.instanceOf(Date),
    start: PropTypes.instanceOf(Date),
    gutterwidth: PropTypes.number
  }
  static defaultProps = {
    gutterwidth: 70
  }
  render() {
    const range = dates.range(this.props.start, this.props.end, 'day')
    
    return (
      <div className="rbc-row">
        <div className="rbc-gutter-cell" style={{width: this.props.gutterwidth}}>
          { message(this.props.messages).allDay }
        </div>
        <div className="rbc-allday-cell">
          <SelectableBackgroundCells selectable constantSelect slots={range.length} />
        </div>
        <div style={{ zIndex: 1, position: 'relative' }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
