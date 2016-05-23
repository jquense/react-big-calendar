import React from 'react';
import dates from './utils/dates';

import TimeSliceGroup from './TimeSliceGroup.jsx'

let TimeGutter = React.createClass({

  propTypes: {
    step: React.PropTypes.number.isRequired,
    slices: React.PropTypes.number,
    now: React.PropTypes.instanceOf(Date).isRequired,
    min: React.PropTypes.instanceOf(Date).isRequired,
    max: React.PropTypes.instanceOf(Date).isRequired,
    showlabels: React.PropTypes.bool,
    timesliceClassnames: React.PropTypes.string,
    culture: React.PropTypes.string,
    timeGutterFormat: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      step: 10,
      slices: 2,
      now: new Date(),
      showlabels: true,
      culture: 'en'
    }
  },

  renderTimeSliceGroup(key, isNow, date) {
    return <TimeSliceGroup key={key} isNow={isNow} slices={this.props.slices} showlabels={this.props.showlabels}
                           culture={this.props.culture} size={this.props.step*this.props.slices} value={date}
                           format={this.props.timeGutterFormat}
                           classNames={this.props.timesliceClassnames}
    />
  },

  render() {
    let { min, max, step, slices: slices, now } = this.props;
    let totalMin = dates.diff(min, max, 'minutes')
    let numSlots = Math.ceil(totalMin / (step * slices))
    let date = min;
    let next = date;
    let children = []; //<div key={-1} className='rbc-time-slot rbc-day-header'>&nbsp;</div>
    let isNow = false

    for (var i = 0; i < numSlots; i++) {
      isNow = dates.inRange(now, date, dates.add(next, step * slices - 1, 'minutes'), 'minutes');
      next = dates.add(date, step * slices, 'minutes');
      children.push(this.renderTimeSliceGroup(i, isNow, date));

      date = next
    }

    return (
      <div className='rbc-time-gutter'>
        {children}
      </div>
    );
  }
});

export default TimeGutter
