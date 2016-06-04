import React, { PropTypes, Component } from 'react'
import cn from 'classnames'


export default class TimeSlice extends Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    showlabel: PropTypes.bool,
    selected: PropTypes.bool,
    content: PropTypes.string,
    culture: PropTypes.string
  }

  static defaultProps = {
    isNow: false,
    showlabel: true,
    selected: false,
    culture: 'en',
    content: '',
  }

  render() {
    return (
      <div className={cn('rbc-time-slot', this.props.isNow ? 'rbc-now' : '')} {...this.props.style}>
        {this.props.showlabel ? <span>{this.props.content}</span> : ''}
      </div>
    )
  }
}

export default TimeSlice
