import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import localizer from './localizer'

let TimeGutter = React.createClass({

  propTypes: {
    step: React.PropTypes.number.isRequired,
    min: React.PropTypes.instanceOf(Date).isRequired,
    max: React.PropTypes.instanceOf(Date).isRequired
  },

  render() {
    let { min, max, step, timeGutterFormat, culture } = this.props;
    let today = new Date()
    let totalMin = dates.diff(min, max, 'minutes')
    let numSlots = Math.ceil(totalMin / step)
    let date = min;
    let children = []; //<div key={-1} className='rbc-time-slot rbc-day-header'>&nbsp;</div>

    for (var i = 0; i < numSlots; i++) {
      let isEven = (i % 2) === 0;
      let next = dates.add(date, step, 'minutes');
      children.push(
        <div key={i}
          className={cn('rbc-time-slot', {
            'rbc-now': dates.inRange(today, date, next, 'minutes')
          })}
        >
        { isEven && (
            <span>{localizer.format(date, timeGutterFormat, culture)}</span>
          )
        }
        </div>
      )

      date = next
    }

    return (
      <div className='rbc-time-gutter'>
        {children}
      </div>
    );
  }
});

export default TimeGutter
