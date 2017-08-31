import PropTypes from 'prop-types'
import React from 'react'

import Week from './Week'
import TimeGrid from './TimeGrid'
import { views } from './utils/constants';

class WorkWeek extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  };

  static defaultProps = TimeGrid.defaultProps;

  render() {
    let { date, ...props } = this.props;
    let range = WorkWeek.range(date, this.props);

    return <TimeGrid {...props} range={range} eventOffset={15} view={views.WORK_WEEK} />
  }
}

WorkWeek.navigate = Week.navigate;

WorkWeek.range = (date, options) => {
  return Week.range(date, options).filter(
    d => [6, 0].indexOf(d.getDay()) === -1
  )
};

export default WorkWeek
