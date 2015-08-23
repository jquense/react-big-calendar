import React, { PropTypes } from 'react';
import invariant from 'invariant';
import uncontrollable from 'uncontrollable';
import {
    accessor
  , elementType
  , dateFormat
  , views as componentViews } from './utils/propTypes';

import { navigate, views } from './utils/constants';
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

function isValidView(view, { views }) {
  if (!Array.isArray(views))
    views = Object.keys(views);

  return views.indexOf(view) !== -1
}

let Calendar = React.createClass({

  propTypes: {
    date: PropTypes.instanceOf(Date),

    events: PropTypes.array,

    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),

    allDayAccessor: accessor,
    startAccessor: accessor,
    endAccessor: accessor,

    dateFormat,
    dayFormat: dateFormat,
    weekdayFormat: dateFormat,

    monthTitleFormat: dateFormat,
    weekTitleFormat: dateFormat,
    dayTitleFormat: dateFormat,
    agendaTitleFormat: dateFormat,
    selectRangeFormat: dateFormat,

    toolbar: PropTypes.bool,


    components: PropTypes.shape({
      event: elementType,

      agenda: PropTypes.shape({
        date: elementType,
        time: elementType,
        event: elementType
      })
    }),

    onNavigate: PropTypes.func,
    onSelect: PropTypes.func,

    views: componentViews,

    messages: PropTypes.shape({
      allDay: PropTypes.string,
      back: PropTypes.string,
      forward: PropTypes.string,
      today: PropTypes.string,
      month: PropTypes.string,
      week: PropTypes.string,
      day: PropTypes.string,
      agenda: PropTypes.string
    })
  },

  getDefaultProps() {
    return {
      events,

      toolbar: true,

      view: views.MONTH,
      views: Object.keys(views).map(k => views[k]),

      date: new Date(2015, 7, 15, 15, 0, 0),

      step: 30,
      min: dates.startOf(new Date(), 'day'),
      max: dates.endOf(new Date(), 'day'),

      allDayAccessor: 'allDay',

      startAccessor: 'start',
      endAccessor: 'end',

      timeGutterFormat: 'h:mm tt',

      dayFormat: 'ddd dd/MM',
      dateFormat: 'dd',
      weekdayFormat: 'ddd',
      selectRangeFormat: ({ start, end }, culture, local)=>
        local.format(start, 'h:mm tt', culture) + ' - ' + local.format(end, 'h:mm tt', culture)
    };
  },

  render() {
    let {
        min, max, components, view, toolbar
      , date: current
     } = this.props;

    let View = VIEWS[view]
      , todaysDate = new Date()
      , todayNotInRange = !dates.inRange(todaysDate, min, max, view)

    let elementProps = omit(this.props, Object.keys(Calendar.propTypes))

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
          {...this.props}
          events={events}
          date={current}
          onHeaderClick={this._headerClick}
          onSelect={this._select}
        />

      </div>
    );
  },

  _navigate(action, newDate) {
    let { view, date, onNavigate } = this.props;

    switch (action){
      case navigate.TODAY:
        date = new Date()
        break;
      case navigate.DATE:
        date = newDate
        break;
      default:
        date = VIEWS[view].navigate(newDate || date, action)
    }

    onNavigate(date)
  },

  _view(view){
    if (view !== this.props.view && isValidView(view, this.props))
      this.props.onView(view)
  },

  _select(events){
    this.props.onSelect(events)
  },

  _headerClick(date){
    let { view } = this.props;

    if ( view === views.MONTH || view === views.WEEK)
      this._view(views.day)

    this._navigate(navigate.DATE, date)
  }
});

export default uncontrollable(Calendar, { view: 'onView', date: 'onNavigate', selected: 'onSelect' })
