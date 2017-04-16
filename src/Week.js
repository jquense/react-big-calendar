import React from 'react';
import PropTypes from 'prop-types';
import dates from './utils/dates';
import localizer from './localizer';
import {navigate as navigateOptions} from './utils/constants';

import TimeGrid from './TimeGrid';

class Week extends React.Component {
    navigate = (date, action) => {
        switch (action) {
            case navigateOptions.PREVIOUS:
                return dates.add(date, -1, 'week');
            case navigateOptions.NEXT:
                return dates.add(date, 1, 'week');
            default:
                return date;
        }
    };

    range = (date, {culture}) => {
        let firstOfWeek = localizer.startOfWeek(culture);
        let start = dates.startOf(date, 'week', firstOfWeek);
        let end = dates.endOf(date, 'week', firstOfWeek);

        return {
            start,
            end,
        };
    };

    render() {
        let {date, ...props} = this.props;
        let {start, end} = this.range(date, this.props);

        return <TimeGrid {...props} start={start} end={end} eventOffset={15}/>;
    }
}
Week.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
};

export default Week
