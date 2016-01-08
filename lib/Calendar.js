'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsPropTypes = require('./utils/propTypes');

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _utilsHelpers = require('./utils/helpers');

var _utilsConstants = require('./utils/constants');

var _utilsDates = require('./utils/dates');

var _utilsDates2 = _interopRequireDefault(_utilsDates);

var _formats = require('./formats');

var _formats2 = _interopRequireDefault(_formats);

var _utilsViewLabel = require('./utils/viewLabel');

var _utilsViewLabel2 = _interopRequireDefault(_utilsViewLabel);

var _utilsMove = require('./utils/move');

var _utilsMove2 = _interopRequireDefault(_utilsMove);

var _Views = require('./Views');

var _Views2 = _interopRequireDefault(_Views);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _lodashObjectOmit = require('lodash/object/omit');

var _lodashObjectOmit2 = _interopRequireDefault(_lodashObjectOmit);

var _lodashObjectDefaults = require('lodash/object/defaults');

var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);

function viewNames(_views) {
  return !Array.isArray(_views) ? Object.keys(_views) : _views;
}

function isValidView(view, _ref) {
  var _views = _ref.views;

  var names = viewNames(_views);
  return names.indexOf(view) !== -1;
}

var now = new Date();

/**
 * react-big-calendar is full featured Calendar component for managing events and dates. It uses
 * modern `flexbox` for layout making it super responsive and performant. Leaving most of the layout heavy lifting
 * to the browser.
 *
 * Big Calendar is unopiniated about editing and moving events, prefering to let you implement it in a way that makes
 * the most sense to your app. It also tries not to be prescriptive about your event data structures, just tell it
 * how to find the start and end datetimes and you can pass it whatever you want.
 */
var Calendar = _react2['default'].createClass({
  displayName: 'Calendar',

  propTypes: {
    /**
     * The current date value of the calendar. Determines the visible view range
     *
     * @controllable onNavigate
     */
    date: _react.PropTypes.instanceOf(Date),

    /**
     * The current view of the calendar.
     *
     * @default 'month'
     * @controllable onView
     */
    view: _react.PropTypes.string,

    /**
     * An array of event objects to display on the calendar
     */
    events: _react.PropTypes.arrayOf(_react.PropTypes.object),

    /**
     * Callback fired when the `date` value changes.
     *
     * @controllable date
     */
    onNavigate: _react.PropTypes.func,

    /**
     * Callback fired when the `view` value changes.
     *
     * @controllable date
     */
    onView: _react.PropTypes.func,

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
    onSelectSlot: _react.PropTypes.func,

    /**
     * Callback fired when a calendar event is selected.
     *
     * ```js
     * function(event: object)
     * ```
     */
    onSelectEvent: _react.PropTypes.func,

    /**
     * An array of built-in view names to allow the calendar to display.
     *
     * @type Calendar.views
     * @default ['month', 'week', 'day', 'agenda']
     */
    views: _utilsPropTypes.views,

    /**
     * Determines whether the toolbar is displayed
     */
    toolbar: _react.PropTypes.bool,

    /**
     * Show truncated events in an overlay when you click the "+_x_ more" link.
     */
    popup: _react.PropTypes.bool,

    /**
     * Distance in pixels, from the edges of the viewport, the "show more" overlay should be positioned.
     *
     * ```js
     * <BigCalendar popupOffset={30}/>
     * <BigCalendar popupOffset={{x: 30, y: 20}}/>
     * ```
     */
    popupOffset: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.shape({ x: _react.PropTypes.number, y: _react.PropTypes.number })]),
    /**
     * Allows mouse selection of ranges of dates/times.
     */
    selectable: _react.PropTypes.bool,

    /**
     * switch the calendar to a `right-to-left` read direction.
     */
    rtl: _react.PropTypes.bool,

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
    eventPropGetter: _react.PropTypes.func,

    /**
     * Accessor for the event title, used to display event information. Should
     * resolve to a `renderable` value.
     *
     * @type {(func|string)}
     */
    titleAccessor: _utilsPropTypes.accessor,

    /**
     * Determines whether the event should be considered an "all day" event and ignore time.
     * Must resolve to a `boolean` value.
     *
     * @type {(func|string)}
     */
    allDayAccessor: _utilsPropTypes.accessor,

    /**
     * The start date/time of the event. Must resolve to a JavaScript `Date` object.
     *
     * @type {(func|string)}
     */
    startAccessor: _utilsPropTypes.accessor,

    /**
     * The end date/time of the event. Must resolve to a JavaScript `Date` object.
     *
     * @type {(func|string)}
     */
    endAccessor: _utilsPropTypes.accessor,

    /**
     * Constrains the minimum _time_ of the Day and Week views.
     */
    min: _react.PropTypes.instanceOf(Date),

    /**
     * Constrains the maximum _time_ of the Day and Week views..
     */
    max: _react.PropTypes.instanceOf(Date),

    /**
     * Localizer specific formats, tell the Calendar how to format and display dates.
     */
    formats: _react.PropTypes.shape({
      /**
       * Format for the day of the month heading in the Month view.
       */
      dateFormat: _utilsPropTypes.dateFormat,

      /**
       * A day of the week format for Week and Day headings
       */
      dayFormat: _utilsPropTypes.dateFormat,
      /**
       * Week day name format for the Month week day headings.
       */
      weekdayFormat: _utilsPropTypes.dateFormat,

      /**
       * Toolbar header format for the Month view.
       */
      monthHeaderFormat: _utilsPropTypes.dateFormat,
      /**
       * Toolbar header format for the Week views.
       */
      weekHeaderFormat: _utilsPropTypes.dateFormat,
      /**
       * Toolbar header format for the Day view.
       */
      dayHeaderFormat: _utilsPropTypes.dateFormat,

      /**
       * Toolbar header format for the Agenda view.
       */
      agendaHeaderFormat: _utilsPropTypes.dateFormat,

      /**
       * A time range format for selecting time slots.
       */
      selectRangeFormat: _utilsPropTypes.dateFormat,

      agendaDateFormat: _utilsPropTypes.dateFormat,
      agendaTimeFormat: _utilsPropTypes.dateFormat,
      agendaTimeRangeFormat: _utilsPropTypes.dateFormat
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
    components: _react.PropTypes.shape({
      event: _utilsPropTypes.elementType,

      agenda: _react.PropTypes.shape({
        date: _utilsPropTypes.elementType,
        time: _utilsPropTypes.elementType,
        event: _utilsPropTypes.elementType
      }),

      day: _react.PropTypes.shape({ event: _utilsPropTypes.elementType }),
      week: _react.PropTypes.shape({ event: _utilsPropTypes.elementType }),
      month: _react.PropTypes.shape({ event: _utilsPropTypes.elementType })
    }),

    /**
     * String messages used throughout the component, override to provide localizations
     */
    messages: _react.PropTypes.shape({
      allDay: _utilsPropTypes.stringOrElement,
      previous: _utilsPropTypes.stringOrElement,
      next: _utilsPropTypes.stringOrElement,
      today: _utilsPropTypes.stringOrElement,
      month: _utilsPropTypes.stringOrElement,
      week: _utilsPropTypes.stringOrElement,
      day: _utilsPropTypes.stringOrElement,
      agenda: _utilsPropTypes.stringOrElement,
      showMore: _react.PropTypes.func
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      popup: false,
      toolbar: true,
      view: _utilsConstants.views.MONTH,
      views: [_utilsConstants.views.MONTH, _utilsConstants.views.WEEK, _utilsConstants.views.DAY, _utilsConstants.views.AGENDA],
      date: now,

      titleAccessor: 'title',
      allDayAccessor: 'allDay',
      startAccessor: 'start',
      endAccessor: 'end'
    };
  },

  render: function render() {
    var _props = this.props;
    var view = _props.view;
    var toolbar = _props.toolbar;
    var events = _props.events;
    var culture = _props.culture;
    var _props$components = _props.components;
    var components = _props$components === undefined ? {} : _props$components;
    var _props$formats = _props.formats;
    var formats = _props$formats === undefined ? {} : _props$formats;
    var style = _props.style;
    var className = _props.className;
    var current = _props.date;

    var props = _objectWithoutProperties(_props, ['view', 'toolbar', 'events', 'culture', 'components', 'formats', 'style', 'className', 'date']);

    formats = _formats2['default'](formats);

    var View = _Views2['default'][view];
    var names = viewNames(this.props.views);

    var elementProps = _lodashObjectOmit2['default'](this.props, Object.keys(Calendar.propTypes));

    var viewComponents = _lodashObjectDefaults2['default'](components[view] || {}, _lodashObjectOmit2['default'](components, names));

    return _react2['default'].createElement(
      'div',
      _extends({}, elementProps, {
        className: _classnames2['default']('rbc-calendar', className, {
          'rbc-rtl': props.rtl
        }),
        style: style
      }),
      toolbar && _react2['default'].createElement(_Toolbar2['default'], {
        date: current,
        view: view,
        views: names,
        label: _utilsViewLabel2['default'](current, view, formats, culture),
        onViewChange: this._view,
        onNavigate: this._navigate,
        messages: this.props.messages
      }),
      _react2['default'].createElement(View, _extends({
        ref: 'view'
      }, props, formats, {
        culture: culture,
        formats: undefined,
        events: events,
        date: current,
        components: viewComponents,
        onNavigate: this._navigate,
        onHeaderClick: this._headerClick,
        onSelectEvent: this._select,
        onSelectSlot: this._selectSlot,
        onShowMore: this._showMore
      }))
    );
  },

  _navigate: function _navigate(action, newDate) {
    var _props2 = this.props;
    var view = _props2.view;
    var date = _props2.date;
    var onNavigate = _props2.onNavigate;

    date = _utilsMove2['default'](action, newDate || date, view);

    onNavigate(date, view);

    if (action === _utilsConstants.navigate.DATE) this._viewNavigate(date);
  },

  _viewNavigate: function _viewNavigate(nextDate) {
    var _props3 = this.props;
    var view = _props3.view;
    var date = _props3.date;
    var culture = _props3.culture;

    if (_utilsDates2['default'].eq(date, nextDate, view, _localizer2['default'].startOfWeek(culture))) {
      this._view(_utilsConstants.views.DAY);
    }
  },

  _view: function _view(view) {
    if (view !== this.props.view && isValidView(view, this.props)) this.props.onView(view);
  },

  _select: function _select(event) {
    _utilsHelpers.notify(this.props.onSelectEvent, event);
  },

  _selectSlot: function _selectSlot(slotInfo) {
    _utilsHelpers.notify(this.props.onSelectSlot, slotInfo);
  },

  _headerClick: function _headerClick(date) {
    var view = this.props.view;

    if (view === _utilsConstants.views.MONTH || view === _utilsConstants.views.WEEK) this._view(_utilsConstants.views.day);

    this._navigate(_utilsConstants.navigate.DATE, date);
  }
});

exports['default'] = _uncontrollable2['default'](Calendar, { view: 'onView', date: 'onNavigate', selected: 'onSelectEvent' });
module.exports = exports['default'];