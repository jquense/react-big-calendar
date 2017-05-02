import React from 'react';
import dates from './utils/dates';
import ResourceGrid from './ResourceGrid';
import { navigate } from './utils/constants';

const Resource = React.createClass({
  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired
  }

  render() {
    let { date, ...props } = this.props;
    let { start, end } = Day.range(date);

    return (
      <ResourceGrid {...props} start={start} end={end} eventOffset={10} />
    );
  }
});

Resource.navigate = (date, action) => {
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'day');

    case navigate.NEXT:
      return dates.add(date, 1, 'day');

    default:
      return date;
  }
};


Resource.range = (date) => {
  date = dates.startOf(date, 'day');
  return { start: date, end: date };
};


export default Resource;

