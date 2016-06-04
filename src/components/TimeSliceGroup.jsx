import React, { PropTypes, Component } from 'react'
import SelectableTimeSlice from '../containers/SelectableTimeSlice.jsx'
import date from '../utils/dates.js'
import localizer from '../localizer'

export default class TimeSliceGroup extends Component {
  static propTypes = {
    slices: PropTypes.oneOf([2,3,4,5]),
    step: PropTypes.number.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    showlabels: PropTypes.bool,
    isNow: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    culture: PropTypes.string
  }
  static defaultProps = {
    slices: 2,
    step: 30,
    isNow: false,
    showlabels: true,
    culture: 'en'
  }

  renderSlice(i, content, value) {

    return <SelectableTimeSlice key={i}
              showlabel={this.props.showlabels && !i}
              content={content}
              culture={this.props.culture}
              isNow={this.props.isNow}
              value={value} />
  }

  renderSlices() {
    const ret = []
    const sliceLength = this.props.step
    let sliceValue = this.props.value
    for (let i = 0; i < this.props.slices; i++) {
      const content = localizer.format(sliceValue, this.props.timeGutterFormat, this.props.culture)
      ret.push(this.renderSlice(i, content, sliceValue))
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
