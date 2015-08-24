import React, { PropTypes } from 'react';
import invariant from 'invariant';
import uncontrollable from 'uncontrollable';
import {
    accessor
  , elementType
  , dateFormat
  , views as componentViews } from './utils/propTypes';

import localizer from './utils/localizer'
import { notify } from './utils/helpers';
import { navigate, views } from './utils/constants';
import dates from './utils/dates';

import Month from './Month';
import Day from './Day';
import Week from './Week';
import Agenda from './Agenda';
import Toolbar from './Toolbar';

import omit from 'lodash/object/omit';
import pick from 'lodash/object/pick';
import defaults from 'lodash/object/defaults';

const VIEWS = {
  [views.MONTH]: Month,
  [views.WEEK]: Week,
  [views.DAY]: Day,
  [views.AGENDA]: Agenda
};

const Formats = {
  [views.MONTH]: 'monthHeaderFormat',
  [views.WEEK]: 'weekHeaderFormat',
  [views.DAY]: 'dayHeaderFormat',
  [views.AGENDA]: 'agendaHeaderFormat'
}

// let timeOverlap = [
//   { start: new Date(2015, 7, 15, 12, 45, 0), end: new Date(2015, 7, 15, 15, 30, 0) },

//   { start: new Date(2015, 7, 15, 12, 45, 0), end: new Date(2015, 7, 15, 17, 30, 0) },
//   { start: new Date(2015, 7, 15, 15, 0, 0), end: new Date(2015, 7, 15, 17, 45, 0) }
// ]

// let events = [
//   { start: new Date(2015, 7, 2), end: new Date(2015, 7, 4) },
//   { start: new Date(2015, 7, 2), end: new Date(2015, 7, 2) },
//   { start: new Date(2015, 7, 2), end: new Date(2015, 7, 2) },
//   { start: new Date(2015, 7, 2), end: new Date(2015, 7, 2) },

//   { start: new Date(2015, 7, 5), end: new Date(2015, 7, 7) },
//   { start: new Date(2015, 7, 5), end: new Date(2015, 7, 5) },
//   { start: new Date(2015, 7, 5), end: new Date(2015, 7, 7) },

//   { start: new Date(2015, 7, 11), end: new Date(2015, 7, 17) },
//   { start: new Date(2015, 7, 7), end: new Date(2015, 7, 12) },
//   { start: new Date(2015, 7, 15, 12, 45, 0), end: new Date(2015, 7, 15, 15, 30, 0) },

//   { start: new Date(2015, 7, 15, 12, 45, 0), end: new Date(2015, 7, 15, 17, 30, 0) },
//   { start: new Date(2015, 7, 15, 15, 0, 0), end: new Date(2015, 7, 15, 17, 45, 0) },
//   { start: new Date(2015, 7, 17), end: new Date(2015, 7, 18) },
//   { start: new Date(2015, 7, 21), end: new Date(2015, 7, 31) }
// ]
function inSame12Hr(start, end){
  let s = 12 - dates.hours(start)
  let e = 12 - dates.hours(end)
  return (s <= 0 && e <= 0) || (s >= 0 && e >= 0)
}

function viewNames(_views){
  return !Array.isArray(_views) ? Object.keys(_views) : _views
}

function isValidView(view, { views: _views }) {
  let names = viewNames(_views)
  return names.indexOf(view) !== -1
}

let now = new Date();

let dateRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'd', culture) + ' — ' + local.format(end, 'd', culture)

let timeRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'h:mmtt', culture) +
    ' — ' + local.format(end, inSame12Hr(start, end) ? 'h:mm' : 'h:mmtt', culture)

let weekRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'MMM dd', culture) +
    ' - ' + local.format(end, dates.eq(start, end, 'month') ? 'dd' : 'MMM dd', culture)

let Calendar = React.createClass({

  propTypes: {
    /**
     * The current date value of the calendar. Determines the visible view range
     */
    date: PropTypes.instanceOf(Date),

    /**
     * An array of event objects to display on the calendar
     */
    events: PropTypes.arrayOf(PropTypes.object),

    /**
     * Callback fired when the `date` value changes.
     */
    onNavigate: PropTypes.func,

    /**
     * A callback fired when a date selection is made.
     *
     * ```js
     * function(
     *   slotInfo: object {
     *     start: date,
     *     end: date,
     *     slots: array<date>
     *   }
     * )
     * ```
     */
    onSelectSlot: PropTypes.func,

    /**
     * Callback fired when an event node is selected.
     *
     * ```js
     * function(event: object)
     * ```
     */
    onSelectEvent: PropTypes.func,

    /**
     * An array of built in view names
     */
    views: componentViews,

    /**
     * Determines whether the toolbar is displayed
     */
    toolbar: PropTypes.bool,

    /**
     * Allows mouse selection of ranges of dates/times.
     */
    selectable: PropTypes.bool,

    /**
     * Accessor for the event title, used to display event information. Should
     * resolve to a `renderable` value.
     *
     * @type {(func|string)}
     */
    titleAccessor: accessor,

    /**
     * Determines whether the event should be considered an "all day" event and ignore time.
     * Must resolve to a `boolean` value.
     *
     * @type {(func|string)}
     */
    allDayAccessor: accessor,

    /**
     * The start date/time of the event. Must resolve to a JavaScript `Date` object.
     *
     * @type {(func|string)}
     */
    startAccessor: accessor,

    /**
     * The end date/time of the event. Must resolve to a JavaScript `Date` object.
     *
     * @type {(func|string)}
     */
    endAccessor: accessor,

    /**
     * Format for the day of the month heading in the Month view.
     */
    dateFormat,

    /**
     * A day of the week format for Week and Day headings
     */
    dayFormat: dateFormat,
    /**
     * Week day name format for the Month week day headings.
     */
    weekdayFormat: dateFormat,

    /**
     * Toolbar header format for the Month view.
     */
    monthHeaderFormat: dateFormat,
    /**
     * Toolbar header format for the Week views.
     */
    weekHeaderFormat: dateFormat,
    /**
     * Toolbar header format for the Day view.
     */
    dayHeaderFormat: dateFormat,
    /**
     * Toolbar header format for the Agenda view.
     */
    agendaHeaderFormat: dateFormat,

    /**
     * A time range format for selecting time slots.
     */
    selectRangeFormat: dateFormat,

    components: PropTypes.shape({
      event: elementType,

      agenda: PropTypes.shape({
        date: elementType,
        time: elementType,
        event: elementType
      })
    }),

    messages: PropTypes.shape({
      allDay: PropTypes.string,
      previous: PropTypes.string,
      next: PropTypes.string,
      today: PropTypes.string,
      month: PropTypes.string,
      week: PropTypes.string,
      day: PropTypes.string,
      agenda: PropTypes.string
    })
  },

  getDefaultProps() {
    return {

      toolbar: true,
      view: views.AGENDA,
      views: [views.MONTH, views.WEEK, views.DAY, views.AGENDA],
      date: now,

      titleAccessor: 'title',
      allDayAccessor: 'allDay',
      startAccessor: 'start',
      endAccessor: 'end',

      timeGutterFormat: 'h:mm tt',

      dayFormat: 'ddd dd/MM',
      dateFormat: 'dd',
      weekdayFormat: 'ddd',

      selectRangeFormat: timeRangeFormat,
      eventTimeRangeFormat: timeRangeFormat,

      monthHeaderFormat: 'MMMM yyyy',
      weekHeaderFormat: weekRangeFormat,
      dayHeaderFormat: 'dddd MMM dd',
      agendaHeaderFormat: dateRangeFormat,

      agendaDateFormat: 'ddd MMM dd',
      agendaTimeFormat: 'hh:mm tt',
      agendaTimeRangeFormat: timeRangeFormat

    };
  },

  render() {
    let {
        view, toolbar, events
      , culture
      , components = {}
      , date: current } = this.props;

    let View = VIEWS[view];
    let headerSingle = view === views.MONTH || view === views.DAY

    let names = viewNames(this.props.views)

    let { start, end } = View.range(current, this.props);

    let headerFormat = this.props[Formats[view]];

    let label = headerSingle
      ? localizer.format(start, headerFormat, culture)
      : localizer.format({ start, end }, headerFormat, culture)

    let elementProps = omit(this.props, Object.keys(Calendar.propTypes))

    let viewComponents = defaults(
      components[view] || {},
      omit(components, names)
    )

    return (
      <div {...elementProps}
        className='rbc-calendar'
      >
        { toolbar &&
          <Toolbar
            date={current}
            view={view}
            views={names}
            label={label}
            onViewChange={this._view}
            onNavigate={this._navigate}
          />
        }
        <View
          ref='view'
          {...this.props}
          events={events}
          date={current}
          components={viewComponents}
          onNavigate={this._navigate}
          onHeaderClick={this._headerClick}
          onSelectEvent={this._select}
          onSelectSlot={this._selectSlot}
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

    onNavigate(date, view)

    if (action === navigate.DATE)
      this._viewNavigate(date)
  },

  _viewNavigate(nextDate){
    let { view, date, culture } = this.props;

    if (dates.eq(date, nextDate, view, localizer.startOfWeek(culture))) {
      this._view(views.DAY)
    }
  },

  _view(view){
    if (view !== this.props.view && isValidView(view, this.props))
      this.props.onView(view)
  },

  _select(event){
    notify(this.props.onSelectEvent, event)
  },

  _selectSlot(slotInfo){
    notify(this.props.onSelectSlot, slotInfo)
  },

  _headerClick(date){
    let { view } = this.props;

    if ( view === views.MONTH || view === views.WEEK)
      this._view(views.day)

    this._navigate(navigate.DATE, date)
  }
});

export default uncontrollable(Calendar, { view: 'onView', date: 'onNavigate', selected: 'onSelectEvent' })
