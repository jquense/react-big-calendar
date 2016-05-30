import React, { PropTypes, Component } from 'react'
import SelectableTimeSlice from '../containers/SelectableTimeSlice.jsx'
import date from '../utils/dates.js'

export default class TimeSliceGroup extends Component {
  static propTypes = {
    slices: PropTypes.oneOf([2,3,4,5]),
    step: PropTypes.number.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    showlabels: PropTypes.bool,
    isNow: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    timesliceClassnames: PropTypes.string,
    culture: PropTypes.string
  }
  static defaultProps = {
    slices: 2,
    step: 10,
    isNow: false,
    showlabels: true,
    timesliceClassnames: '',
    culture: 'en'
  }

  renderSlice(i, classNames, value) {
    return <SelectableTimeSlice key={i}
              classNames={classNames}
              showlabel={this.props.showlabels && !i}
              format={this.props.timeGutterFormat}
              culture={this.props.culture}
              isNow={this.props.isNow}
              value={value} />
  }

  renderSlices() {
    let classNames = this.props.timesliceClassnames
    switch (this.props.slices) {
      case 2 :
        break
      case 3 :
        classNames += ' three'
        break
      case 4 :
        classNames += ' four'
        break
      case 5 :
      default :
        classNames += ' five'
        break
    }
    const ret = []
    const sliceLength = this.props.step
    let sliceValue = this.props.value
    for (let i = 0; i < this.props.slices; i++) {
      ret.push(this.renderSlice(i, classNames, sliceValue))
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
