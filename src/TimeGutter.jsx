import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import localizer from './utils/localizer'

let TimeGutter = React.createClass({

  propTypes: {
    step: React.PropTypes.number,
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date)
  },

  getDefaultProps() {
    return {
      step: 30,
      min: dates.startOf(new Date(), 'day'),
      max: dates.endOf(new Date(), 'day')
    };
  },

  render() {
    let { min, max, step } = this.props;
    let totalMin = dates.diff(min, max, 'minutes')
    let numSlots = Math.ceil(totalMin / step)
    let date = min;
    let children = []; //<div key={-1} className='rbc-time-slot rbc-day-header'>&nbsp;</div>

    for (var i = 0; i < numSlots; i++) {
      let isEven = (i % 2) === 0;

      children.push(
        <div key={i} className='rbc-time-slot'>
        { isEven && (
            <span>{localizer.format(date, 'h:mm tt')}</span>
          )
        }
        </div>
      )

      date = dates.add(date, step, 'minutes')
    }

    return (
      <div className='rbc-time-gutter'>
        {children}
      </div>
    );
  }
});

export default TimeGutter
