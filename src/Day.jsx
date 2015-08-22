import React from 'react';
import dates from './utils/dates';
import TimeGrid from './TimeGrid';

let Day = React.createClass({

  propTypes: TimeGrid.propTypes,

  getDefaultProps() {
    return {
      step: 30,
      min: dates.startOf(new Date(), 'day'),
      max: dates.endOf(new Date(), 'day'),
      dayFormat: 'dddd dd MMM'
    };
  },

  render() {
    let { date } = this.props;

    return (
      <TimeGrid {...this.props} start={date} end={date}/>
    );
  }
});

export default Day
