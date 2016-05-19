import React, { PropTypes, Component } from 'react'
import SelectableBackgroundCell from '../containers/SelectableBackgroundCell.jsx'

export default class BackgroundCells extends Component {
  static propTypes = {
    slots: PropTypes.number.isRequired,
    getValueFromSlot: PropTypes.func.isRequired
  }

  static defaultProps = {
    getValueFromSlot: (i) => i
  }
  
  render() {
    const slots = []
    for (let i = 0; i < this.props.slots; i++) {
      slots.push(<SelectableBackgroundCell key={i} index={i} value={this.props.getValueFromSlot(i)} slots={this.props.slots} />)
    }
    return (
      <div className='rbc-row-bg'>
        {slots}
      </div>
    )
  }
}
