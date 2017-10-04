import React from 'react';

import dates from 'date-arithmetic';
import events from '../events';
import BigCalendar from 'react-big-calendar';
import localizer from 'react-big-calendar/lib/localizer';
import TimeGrid from 'react-big-calendar/lib/TimeGrid';


const getRange = (date, culture) => {
  let firstOfWeek = localizer.startOfWeek(culture);
  let start = dates.startOf(date, 'week', firstOfWeek);
  let end = dates.endOf(date, 'week', firstOfWeek);

  if (firstOfWeek === 1) {
    end = dates.subtract(end, 2, 'day');
  } else {
    start = dates.add(start, 1, 'day');
    end = dates.subtract(end, 1, 'day');
  }

  return dates.range(start, end)
}

class MyWeek extends React.Component {
  render() {
    let { date, culture } = this.props;
    let range = getRange(date, culture);

    return (
      <TimeGrid {...this.props} range={range} eventOffset={15} />
    );
  }
}

MyWeek.navigate = (date, action) => {
  switch (action){
    case BigCalendar.Navigate.PREVIOUS:
      return dates.add(date, -1, 'week');

    case BigCalendar.Navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date;
  }
}

MyWeek.title = (date, { formats, culture }) => {
  return `My awesome week: ${Date.toLocaleString()}`
}


let CustomView = React.createClass({
  render(){
    return (
      <div>
        <BigCalendar
          events={events}
          defaultDate={new Date(2015, 3, 1)}
          views={{ month: true, week: MyWeek }}
          test="io"
        />
      </div>
    )
  }
})

export default CustomView;
