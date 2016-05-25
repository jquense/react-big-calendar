import React, { PropTypes, Component } from 'react'
import cn from 'classnames'

import localizer from '../localizer'

export default class TimeSlice extends Component {
  static propTypes = {
    time: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    classNames: PropTypes.string,
    showlabel: PropTypes.bool,
    selected: PropTypes.bool,
    format: PropTypes.string,
    culture: PropTypes.string
  }

  static defaultProps = {
    time: () => '',
    isNow: false,
    showlabel: true,
    selected: false,
    culture: 'en'
  }

  render() {
    return (
      <div className={cn('rbc-time-slot', this.props.isNow ? 'rbc-now' : '', this.props.classNames)}>
        <span>{this.props.showlabel ?
          localizer.format(this.props.value, this.props.format, this.props.culture)
          : ''}</span>
      </div>
    )
  }
}

export default TimeSlice
