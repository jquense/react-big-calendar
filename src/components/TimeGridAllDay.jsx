import React, { PropTypes, Component } from 'react'
import message from '../utils/messages';

import SelectableBackgroundCells from '../containers/SelectableBackgroundCells.jsx'

export default class TimeGridAllDay extends Component {
  static propTypes = {
    messages: React.PropTypes.array,
    gutterwidth: PropTypes.number,
    range: React.PropTypes.array
  }
  static defaultProps = {
    gutterwidth: 70,
    range: []
  }
  render() {
    
    return (
      <div className="rbc-row">
        <div className="rbc-gutter-cell" style={{width: this.props.gutterwidth}}>
          { message(this.props.messages).allDay }
        </div>
        <div className="rbc-allday-cell">
          <SelectableBackgroundCells selectable constantSelect slots={this.props.range.length} />
        </div>
        <div style={{ zIndex: 1, position: 'relative' }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
