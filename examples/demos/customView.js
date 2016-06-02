import React from 'react';
import BigCalendar from '../../src/index';
import events from '../events';
import { navigate } from 'react-big-calendar/utils/constants';
import Week from 'react-big-calendar/Week';
import dates from 'react-big-calendar/utils/dates';
import localizer from 'react-big-calendar/localizer';
import TimeGrid from 'react-big-calendar/TimeGrid';

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
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'week');

    case navigate.NEXT:
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
