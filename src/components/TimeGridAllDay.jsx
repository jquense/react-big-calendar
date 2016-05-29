import React, { PropTypes, Component } from 'react'
import message from '../utils/messages';

import SelectableBackgroundCells from '../containers/SelectableBackgroundCells.jsx'

export default class TimeGridAllDay extends Component {
  static propTypes = {
    messages: PropTypes.array,
    gutterWidth: PropTypes.number,
    range: PropTypes.array,
    selectable: PropTypes.bool,
    gutterRef: PropTypes.func
  }
  static defaultProps = {
    range: [],
    gutterRef: () => null
  }
  render() {
    
    return (
      <div className="rbc-row">
        <div ref={this.props.gutterRef} className="rbc-gutter-cell" style={this.props.gutterWidth ?
          {width: this.props.gutterWidth} : {}}>
          { message(this.props.messages).allDay }
        </div>
        <div className="rbc-allday-cell">
          <SelectableBackgroundCells selectable={this.props.selectable}
                                     constantSelect
                                     slots={this.props.range.length}
                                     getValueFromSlot={(slot) => this.props.range[slot]}
          />
        </div>
        <div style={{ zIndex: 1, position: 'relative' }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
