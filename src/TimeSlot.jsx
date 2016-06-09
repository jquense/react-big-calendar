import React, { PropTypes, Component } from 'react'
import cn from 'classnames'

export default class TimeSlot extends Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    showLabel: PropTypes.bool,
    content: PropTypes.string,
    culture: PropTypes.string
  }

  static defaultProps = {
    isNow: false,
    showLabel: false,
    content: ''
  }

  render() {
    return (
      <div
        className={cn(
          'rbc-time-slot',
          this.props.showLabel && 'rbc-label',
          this.props.isNow && 'rbc-now',
        )}
      >
      {this.props.showLabel &&
        <span>{this.props.content}</span>
      }
      </div>
    )
  }
}
