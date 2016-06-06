import React, { PropTypes, Component } from 'react'
import cn from 'classnames'

export default class TimeSlice extends Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    showLabel: PropTypes.bool,
    selected: PropTypes.bool,
    content: PropTypes.string,
    culture: PropTypes.string
  }

  static defaultProps = {
    isNow: false,
    showLabel: false,
    selected: false,
    content: ''
  }

  render() {
    return (
      <div className={cn('rbc-time-slot', this.props.isNow && 'rbc-now')} {...this.props.style}>
        {this.props.showLabel ? <span>{this.props.content}</span> : ''}
      </div>
    )
  }
}
