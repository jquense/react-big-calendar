import React, { PropTypes } from 'react';
import uncontrollable from 'uncontrollable';
import { accessor, elementType, dateFormat } from './utils/propTypes';
import { directions, views } from './utils/constants';
import dates from './utils/dates';

import Month from './Month';
import Day from './Day';
import Week from './Week';
import Toolbar from './Toolbar';

import omit from 'lodash/object/omit';
import pick from 'lodash/object/pick';

const VIEWS = {
  [views.MONTH]: Month,
  [views.DAY]: Day,
  [views.WEEK]: Week
};

let timeOverlap = [
  { start: new Date(2015, 7, 15, 12, 45, 0), end: new Date(2015, 7, 15, 15, 30, 0) },

  { start: new Date(2015, 7, 15, 12, 45, 0), end: new Date(2015, 7, 15, 17, 30, 0) },
  { start: new Date(2015, 7, 15, 15, 0, 0), end: new Date(2015, 7, 15, 17, 45, 0) }
]

let events = [
  { start: new Date(2015, 7, 2), end: new Date(2015, 7, 4) },
  { start: new Date(2015, 7, 2), end: new Date(2015, 7, 2) },
  { start: new Date(2015, 7, 2), end: new Date(2015, 7, 2) },
  { start: new Date(2015, 7, 2), end: new Date(2015, 7, 2) },

  { start: new Date(2015, 7, 5), end: new Date(2015, 7, 7) },
  { start: new Date(2015, 7, 5), end: new Date(2015, 7, 5) },
  { start: new Date(2015, 7, 5), end: new Date(2015, 7, 7) },

  { start: new Date(2015, 7, 11), end: new Date(2015, 7, 17) },
  { start: new Date(2015, 7, 7), end: new Date(2015, 7, 12) },
  { start: new Date(2015, 7, 15, 12, 45, 0), end: new Date(2015, 7, 15, 15, 30, 0) },

  { start: new Date(2015, 7, 15, 12, 45, 0), end: new Date(2015, 7, 15, 17, 30, 0) },
  { start: new Date(2015, 7, 15, 15, 0, 0), end: new Date(2015, 7, 15, 17, 45, 0) },
  { start: new Date(2015, 7, 17), end: new Date(2015, 7, 18) },
  { start: new Date(2015, 7, 21), end: new Date(2015, 7, 31) }
]

let Calendar = React.createClass({

  propTypes: {
    date: PropTypes.instanceOf(Date),

    events: PropTypes.array,

    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),

    allDayAccessor: accessor,
    startAccessor: accessor,
    endAccessor: accessor,

    //dateFormat,
    dayFormat: dateFormat,
    // weekdayFormat: dateFormat,

    toolbar: PropTypes.bool,

    eventComponent: elementType,

    onNavigate: PropTypes.func,
    onSelect: PropTypes.func,

    messages: PropTypes.shape({
      allDay: PropTypes.string
    })
  },

  getDefaultProps() {
    return {
      events,


      view: views.MONTH,

      date: new Date(2015, 7, 15, 15, 0, 0),

      step: 30,
      min: dates.startOf(new Date(), 'day'),
      max: dates.endOf(new Date(), 'day'),

      allDayAccessor: 'allDay',

      startAccessor: 'start',
      endAccessor: 'start',

      dayFormat: 'ddd dd/MM',
      dateFormat: 'dd',
      weekdayFormat: 'ddd'
    };
  },

  render() {
    let { min, max, date: current, view = views.MONTH } = this.props;

    let View = VIEWS[view]
      , todaysDate = new Date()
      , todayNotInRange = !dates.inRange(todaysDate, min, max, view)

    let elementProps = omit(this.props, Object.keys(Calendar.propTypes))
      , viewProps  = pick(this.props, Object.keys(View.propTypes))

    return (
      <div {...elementProps}
        className='rbc-calendar'
      >
        { toolbar &&
          <Toolbar
            date={current}
            longFormat={'D'}
            onViewChange={this._view}
            onNavigate={this._navigate}
          />
        }
        <View
          {...viewProps}
          events={events}
          date={current}
          onHeaderClick={this._headerClick}
          onEventClick={this._select}
        />

      </div>
    );
  },

  _navigate(action) {
    let { view, date, onNavigate } = this.props;
    let back = action === 'back';

    if (action === 'today')
      return onNavigate(new Date())

    if (view === views.MONTH)
      date = dates.add(date, back ? -1 : 1, 'month')

    if (view === views.WEEK)
      date = dates.add(date, back ? -1 : 1, 'week')

    if (view === views.DAY)
      date = dates.add(date, back ? -1 : 1, 'day')

    onNavigate(date)
  },

  _view(view){
    this.props.onView(view)
  },

  _select(){},

  _headerClick(){}
});

export default uncontrollable(Calendar, { view: 'onView', date: 'onNavigate' })
