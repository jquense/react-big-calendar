import React, { PropTypes, Component } from 'react'
import TimeSlice from './TimeSlice.jsx'
import SelectableTimeSlice from '../containers/SelectableTimeSlice.jsx'
import date from '../utils/dates.js'

export default class TimeSliceGroup extends Component {
  static propTypes = {
    slices: PropTypes.oneOf([2,3,4,5]),
    step: PropTypes.number.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    timesliceComponent: PropTypes.oneOf([TimeSlice, SelectableTimeSlice]),
    showlabels: PropTypes.bool,
    isNow: PropTypes.bool,
    timegutterFormat: PropTypes.string,
    timesliceClassnames: PropTypes.string,
    culture: PropTypes.string
  }
  static defaultProps = {
    slices: 2,
    step: 10,
    isNow: false,
    showlabels: true,
    timesliceComponent: TimeSlice,
    timesliceClassnames: '',
    culture: 'en'
  }

  renderSlice(i, className, value) {
    const T = this.props.timesliceComponent
    return <T key={i}
              className={className}
              showlabel={this.props.showlabels && !i}
              format={this.props.timegutterFormat}
              culture={this.props.culture}
              isNow={this.props.isNow}
              value={value} />
  }

  renderSlices() {
    let className = this.props.timesliceClassnames
    switch (this.props.slices) {
      case 2 :
        break
      case 3 :
        className += ' three'
        break
      case 4 :
        className += ' four'
        break
      case 5 :
      default :
        className += ' five'
        break
    }
    const ret = []
    const sliceLength = this.props.step
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
