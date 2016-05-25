import React, {PropTypes} from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';
import days from '../days';
import moment from 'moment';
import 'moment-range';
import {forEach} from 'lodash';

let Basic = React.createClass({

    dayPropGetter(currentDay){
        let isDayInCommission = false;
        forEach(days, day => {
                const dateRange = moment.range(day.from, day.before);
                if (dateRange.contains(currentDay)) {
                    isDayInCommission = true
                }

            }
        )
        return isDayInCommission ? 'green' : 'lightblue';
    },

    render(){
        return (
            <BigCalendar
                events={events}
                days={days}
                dayPropGetter={this.dayPropGetter}
                defaultDate={new Date(2015, 3, 1)}
            />
        )
    }
})

export default Basic;
