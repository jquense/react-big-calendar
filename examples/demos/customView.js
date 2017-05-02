import React from 'react';

import events from '../events';
import BigCalendar from 'react-big-calendar';
import Week from 'react-big-calendar/lib/Week';
import dates from 'react-big-calendar/lib/utils/dates';
import localizer from 'react-big-calendar/lib/localizer';
import TimeGrid from 'react-big-calendar/lib/TimeGrid';

class MyWeek extends Week {
    navigate = (date, action) => {
        switch (action) {
            case BigCalendar.Navigate.PREVIOUS:
                return dates.add(date, -1, 'week');
            case BigCalendar.Navigate.NEXT:
                return dates.add(date, 1, 'week');
            default:
                return date;
        }
    };

    range = (date, {culture}) => {
        let firstOfWeek = localizer.startOfWeek(culture);
        let start = dates.startOf(date, 'week', firstOfWeek);
        let end = dates.endOf(date, 'week', firstOfWeek);

        if (firstOfWeek === 1) {
            end = dates.subtract(end, 2, 'day');
        } else {
            start = dates.add(start, 1, 'day');
            end = dates.subtract(end, 1, 'day');
        }

        return {start, end};
    };

    render() {
        let {date} = this.props;
        let {start, end} = this.range(date, this.props);

        return <TimeGrid {...this.props} start={start} end={end} eventOffset={15}/>;
    }
}

class CustomView extends React.Component {
    render() {
        return (
            <div>
                <BigCalendar defaultDate={new Date(2015, 3, 1)}
                             events={events}
                             test="io"
                             views={{month: true, week: MyWeek}}/>
            </div>
        )
    }
}

export default CustomView;
