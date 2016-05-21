import React, { PropTypes, Component } from 'react'
import TimeSlice from './TimeSlice.jsx'
import date from '../utils/dates.js'

export default class TimeSliceGroup extends Component {
  static propTypes = {
    slices: PropTypes.oneOf([2,3,4,5]),
    size: PropTypes.number.isRequired,
    time: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool
  }
  static defaultProps = {
    slices: 2,
    isNow: false,
    time: () => null
  }

  renderSlice(i, className, value) {
    return <TimeSlice key={i} showlabel={!i} time={this.props.time} isNow={this.props.isNow}
                  classNames={className} value={value} />
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
    const sliceLength = Math.floor(this.props.size / this.props.slices)
    let sliceValue = this.props.value
    for (let i = 0; i < this.props.slices; i++) {
      ret.push(this.renderSlice(i, className, sliceValue))
      sliceValue = date.add(sliceValue, sliceLength , 'minutes')
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
