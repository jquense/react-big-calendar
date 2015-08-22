import React from 'react';
import dates from './utils/dates';
import TimeGrid from './TimeGrid';
import { navigate } from './utils/constants';

let Day = React.createClass({

  propTypes: TimeGrid.propTypes,

  render() {
    let { date } = this.props;

    return (
      <TimeGrid {...this.props} start={date} end={date} eventOffset={10}/>
    );
  }
});

Day.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'day');

    case navigate.NEXT:
      return dates.add(date, 1, 'day')

    default:
      return date;
  }
}

export default Day
