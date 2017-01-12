import React from 'react';

import events from '../events';
import BigCalendar from 'react-big-calendar';
import Week from 'react-big-calendar/lib/Week';
import dates from 'react-big-calendar/lib/utils/dates';
import localizer from 'react-big-calendar/lib/localizer';
import TimeGrid from 'react-big-calendar/lib/TimeGrid';

class MyWeek extends Week {
  render() {
    let { date } = this.props;
    let { start, end } = MyWeek.range(date, this.props);

    return (
      <TimeGrid {...this.props} start={start} end={end} eventOffset={15} />
    );
  }
}

MyWeek.navigate = (date, action)=>{
  switch (action){
    case BigCalendar.Navigate.PREVIOUS:
      return dates.add(date, -1, 'week');

    case BigCalendar.Navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date;
  }
}

MyWeek.range = (date, { culture }) => {
  let firstOfWeek = localizer.startOfWeek(culture);
  let start = dates.startOf(date, 'week', firstOfWeek);
  let end = dates.endOf(date, 'week', firstOfWeek);

  if (firstOfWeek === 1) {
    end = dates.subtract(end, 2, 'day');
  } else {
    start = dates.add(start, 1, 'day');
    end = dates.subtract(end, 1, 'day');
  }

  return { start, end };
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
