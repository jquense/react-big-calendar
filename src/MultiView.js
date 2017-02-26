import React from 'react';
import dates from './utils/dates';
import MultiTimeGrid from './MultiTimeGrid';
import { navigate } from './utils/constants';

let MultiView = React.createClass({

  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired,
  },

  render() {
    let { date, ...props } = this.props;
    let { start, end } = MultiView.range(date)

    return (
      <MultiTimeGrid {...props} start={start} end={end} eventOffset={10} />
    );
  }
});

MultiView.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'day');

    case navigate.NEXT:
      return dates.add(date, 1, 'day')

    default:
      return date;
  }
}


MultiView.range = (date)=> {
  date = dates.startOf(date, 'day')
  return { start: date, end: date }
}


export default MultiView;
