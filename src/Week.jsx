import React from 'react';
import dates from './utils/dates';
import localizer from './utils/localizer';

import TimeGrid from './TimeGrid';

let Week = React.createClass({

  propTypes: TimeGrid.propTypes,

  render() {
    let { date, culture } = this.props;
    let firstOfWeek = localizer.startOfWeek(culture)
    let start = dates.startOf(date, 'week', firstOfWeek)
    let end = dates.endOf(date, 'week', firstOfWeek)

    return (
      <TimeGrid {...this.props} start={start} end={end}/>
    );
  }

});

export default Week
