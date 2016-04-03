import React, { PropTypes } from 'react';
import uncontrollable from 'uncontrollable';
import cn from 'classnames';
import {
    accessor
  , elementType
  , dateFormat
  , views as componentViews } from './utils/propTypes';

import localizer from './localizer'
import { notify } from './utils/helpers';
import { navigate, views } from './utils/constants';
import dates from './utils/dates';
import defaultFormats from './formats';
import viewLabel from './utils/viewLabel';
import moveDate from './utils/move';
import VIEWS from './Views';
import Toolbar from './Toolbar';

import omit from 'lodash/object/omit';
import defaults from 'lodash/object/defaults';

function viewNames(_views){
  return !Array.isArray(_views) ? Object.keys(_views) : _views
}

function isValidView(view, { views: _views }) {
  let names = viewNames(_views)
  return names.indexOf(view) !== -1
}

let now = new Date();

/**
 * react-big-calendar is full featured Calendar component for managing events and dates. It uses
 * modern `flexbox` for layout making it super responsive and performant. Leaving most of the layout heavy lifting
 * to the browser. __note:__ The default styles use `height: 100%` which means your container must set an explicit
 * height (feel free to adjust the styles to suit your specific needs).
 *
 * Big Calendar is unopiniated about editing and moving events, prefering to let you implement it in a way that makes
 * the most sense to your app. It also tries not to be prescriptive about your event data structures, just tell it
 * how to find the start and end datetimes and you can pass it whatever you want.
 *
 * One thing to note is that, `react-big-calendar` treats event start/end dates as an _exclusive_ range.
 * which means that the event spans up to, but not including, the end date. In the case
 * of displaying events on whole days, end dates are rounded _up_ to the next day. So an
 * event ending on `Apr 8th 12:00:00 am` will not appear on the 8th, whereas one ending
 * on `Apr 8th 12:01:00 am` will. If you want _inclusive_ ranges consider providing a
 * function `endAccessor` that returns the end date + 1 day for those events that end at midnight.
 */
let Calendar = React.createClass({

  propTypes: {
    /**
     * The current date value of the calendar. Determines the visible view range
     *
     * @controllable onNavigate
     */
    date: PropTypes.instanceOf(Date),

    /**
     * The current view of the calendar.
     *
     * @default 'month'
     * @controllable onView
     */
    view: PropTypes.string,

    /**
     * An array of event objects to display on the calendar
     */
    events: PropTypes.arrayOf(PropTypes.object),

    /**
     * Callback fired when the `date` value changes.
     *
     * @controllable date
     */
    onNavigate: PropTypes.func,

    /**
     * Callback fired when the `view` value changes.
     *
     * @controllable date
     */
    onView: PropTypes.func,

    /**
     * A callback fired when a date selection is made. Only fires when `selectable` is `true`.
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
     * Callback fired when a calendar event is selected.
     *
     * ```js
     * function(event: object)
     * ```
     */
    onSelectEvent: PropTypes.func,

    /**
     * Callback fired when dragging a selection in the Time views.
     *
     * Returning `false` from the handler will prevent a selection.
     *
     * ```js
     * function ({ start: Date, end: Date }) : boolean
     * ```
     */
    onSelecting: PropTypes.func,

    /**
     * An array of built-in view names to allow the calendar to display.
     *
     * @type Calendar.views
     * @default ['month', 'week', 'day', 'agenda']
     */
    views: componentViews,

    /**
     * Determines whether the toolbar is displayed
     */
    toolbar: PropTypes.bool,

    /**
     * Show truncated events in an overlay when you click the "+_x_ more" link.
     */
    popup: PropTypes.bool,

    /**
     * Distance in pixels, from the edges of the viewport, the "show more" overlay should be positioned.
     *
     * ```js
     * <BigCalendar popupOffset={30}/>
     * <BigCalendar popupOffset={{x: 30, y: 20}}/>
     * ```
     */
    popupOffset: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
    ]),
    /**
     * Allows mouse selection of ranges of dates/times.
     */
    selectable: PropTypes.bool,

    /**
     * switch the calendar to a `right-to-left` read direction.
     */
    rtl: PropTypes.bool,

    /**
     * Optionally provide a function that returns an object of className or style props
     * to be applied to the the event node.
     *
     * ```js
     * function(
     * 	event: object,
     * 	start: date,
     * 	end: date,
     * 	isSelected: bool
     * ) -> { className: string?, style: object? }
     * ```
     */
    eventPropGetter: PropTypes.func,

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
     * Constrains the minimum _time_ of the Day and Week views.
     */
    min: PropTypes.instanceOf(Date),

    /**
     * Constrains the maximum _time_ of the Day and Week views..
     */
    max: PropTypes.instanceOf(Date),

    /**
     * Localizer specific formats, tell the Calendar how to format and display dates.
     */
    formats: PropTypes.shape({
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


      agendaDateFormat: dateFormat,
      agendaTimeFormat: dateFormat,
      agendaTimeRangeFormat: dateFormat
    }),

    /**
     * Customize how different sections of the calendar render by providing custom Components.
     * In particular the `Event` component can be specified for the entire calendar, or you can
     * provide an individual component for each view type.
     *
     * ```jsx
     * let components = {
     *   event: MyEvent, // used by each view (Month, Day, Week)
     *   agenda: {
     *   	 event: MyAgendaEvent // with the agenda view use a different component to render events
     *   }
     * }
     * <Calendar components={components} />
     * ```
     */
    components: PropTypes.shape({
      event: elementType,

      agenda: PropTypes.shape({
        date: elementType,
        time: elementType,
        event: elementType
      }),

      day: PropTypes.shape({ event: elementType }),
      week: PropTypes.shape({ event: elementType }),
      month: PropTypes.shape({ event: elementType })
    }),

    /**
     * String messages used throughout the component, override to provide localizations
     */
    messages: PropTypes.shape({
      allDay: PropTypes.node,
      previous: PropTypes.node,
      next: PropTypes.node,
      today: PropTypes.node,
      month: PropTypes.node,
      week: PropTypes.node,
      day: PropTypes.node,
      agenda: PropTypes.node,
      showMore: PropTypes.func
    })
  },

  getDefaultProps() {
    return {
      popup: false,
      toolbar: true,
      view: views.MONTH,
      views: [views.MONTH, views.WEEK, views.DAY, views.AGENDA],
      date: now,

      titleAccessor: 'title',
      allDayAccessor: 'allDay',
      startAccessor: 'start',
      endAccessor: 'end'
    };
  },

  render() {
    let {
        view, toolbar, events
      , culture
      , components = {}
      , formats = {}
      , style
      , className
      , date: current
      , ...props } = this.props;

    formats = defaultFormats(formats)

    let View = VIEWS[view];
    let names = viewNames(this.props.views)

    let elementProps = omit(this.props, Object.keys(Calendar.propTypes))

    let viewComponents = defaults(
      components[view] || {},
      omit(components, names)
    )

    return (
      <div {...elementProps}
        className={cn('rbc-calendar', className, {
          'rbc-rtl': props.rtl
        })}
        style={style}
      >
        { toolbar &&
          <Toolbar
            date={current}
            view={view}
            views={names}
            label={viewLabel(current, view, formats, culture)}
            onViewChange={this._view}
            onNavigate={this._navigate}
            messages={this.props.messages}
          />
        }
        <View
          ref='view'
          {...props}
          {...formats}
          culture={culture}
          formats={undefined}
          events={events}
          date={current}
          components={viewComponents}
          onNavigate={this._navigate}
          onHeaderClick={this._headerClick}
          onSelectEvent={this._select}
          onSelectSlot={this._selectSlot}
          onShowMore={this._showMore}
        />
      </div>
    );
  },

  _navigate(action, newDate) {
    let { view, date, onNavigate } = this.props;

    date = moveDate(action, newDate || date, view)

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
