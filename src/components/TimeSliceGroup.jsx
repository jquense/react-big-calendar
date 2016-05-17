import React, { PropTypes, Component } from 'react'
import TimeSlice from './TimeSlice.jsx'

export default class TimeSliceGroup extends Component {
  static propTypes = {
    slices: PropTypes.oneOf([2,3,4,5]),
    time: PropTypes.func.isRequired,
    isNow: PropTypes.bool
  }
  static defaultProps = {
    slices: 2,
    isNow: false,
    time: () => null
  }
  renderSlices() {
    let className
    switch (this.props.slices) {
      case 2 :
        className = ''
        break
      case 3 :
        className = 'three'
        break
      case 4 :
        className = 'four'
        break
      case 5 :
      default :
        className = 'five'
        break
    }
    const ret = []
    for (let i = 0; i < this.props.slices; i++) {
      if (!i) {
        ret.push(<TimeSlice key={i} showlabel time={this.props.time} isNow={this.props.isNow} classNames={className}/>)
        continue
      }
      ret.push(<TimeSlice key={i} showlabel={false} time={() => ''} classNames={className} />)
    }
    return ret
  }
  render() {
    return (
      <div className="rbc-timeslice-group">
        {this.renderSlices()}
      </div>
    )
  }
}
