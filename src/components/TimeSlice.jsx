import React, { PropTypes, Component } from 'react'
import cn from 'classnames'

export default class TimeSlice extends Component {
  static propTypes = {
    time: PropTypes.func.isRequired,
    isNow: PropTypes.bool,
    classNames: PropTypes.string,
    showlabel: PropTypes.bool,
    selected: PropTypes.bool
  }

  render() {
    return (
      <div className={cn('rbc-time-slot', this.props.isNow ? ' rbc-now' : '', this.props.classNames)}>
        <span>{this.props.showlabel ? this.props.time() : ''}</span>
        {this.props.selected ?  <div className='rbc-slot-selection' >hi</div> : ''}
      </div>
    )
  }
}

export default TimeSlice
