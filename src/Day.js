import React from 'react';
import PropTypes from 'prop-types';
import dates from './utils/dates';
import TimeGrid from './TimeGrid';
import {navigate as navigateOptions} from './utils/constants';

class Day extends React.Component {
    navigate = (date, action) => {
        switch (action) {
            case navigateOptions.PREVIOUS:
                return dates.add(date, -1, 'day');
            case navigateOptions.NEXT:
                return dates.add(date, 1, 'day');
            default:
                return date;
        }
    };

    range = (date) => {
        date = dates.startOf(date, 'day');

        return {
            start: date,
            end: date,
        };
    };

    render() {
        let {date, ...props} = this.props;
        let {start, end} = this.range(date);

        return (
            <TimeGrid {...props}
                      end={end}
                      eventOffset={10}
                      start={start}/>
        );
    }
}

Day.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
};

export default Day;
