import React, { PropTypes, Component } from 'react'
import cn from 'classnames'

export default class TimeSlice extends Component {
  static propTypes = {
    time: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    classNames: PropTypes.string,
    showlabel: PropTypes.bool,
    selected: PropTypes.bool
  }

  static defaultProps = {
    time: () => '',
    isNow: false,
    showlabel: true,
    selected: false
  }

  render() {
    return (
      <div className={cn('rbc-time-slot', this.props.isNow ? 'rbc-now' : '', this.props.classNames)}>
        <span>{this.props.showlabel ? this.props.time(this.props.value) : ''}</span>
      </div>
    )
  }
}

export default TimeSlice
