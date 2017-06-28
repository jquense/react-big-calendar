import PropTypes from 'prop-types';
import React from 'react';
import dates from './utils/dates';
import TimeGrid from './TimeGrid';
import { navigate, views } from './utils/constants';

class Day extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  };

  render() {
    let { date, ...props } = this.props;
    let range = Day.range(date)

    return (
      <TimeGrid {...props} range={range} eventOffset={10} view={views.DAY} />
    );
  }
}

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


Day.range = (date)=> {
  return [dates.startOf(date, 'day')]
}


export default Day
