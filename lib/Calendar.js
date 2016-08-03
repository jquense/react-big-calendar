'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('./utils/propTypes');

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _helpers = require('./utils/helpers');

var _constants = require('./utils/constants');

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _formats = require('./formats');

var _formats2 = _interopRequireDefault(_formats);

var _viewLabel = require('./utils/viewLabel');

var _viewLabel2 = _interopRequireDefault(_viewLabel);

var _move = require('./utils/move');

var _move2 = _interopRequireDefault(_move);

var _Views = require('./Views');

var _Views2 = _interopRequireDefault(_Views);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _omit = require('lodash/object/omit');

var _omit2 = _interopRequireDefault(_omit);

var _defaults = require('lodash/object/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _transform = require('lodash/object/transform');

var _transform2 = _interopRequireDefault(_transform);

var _mapValues = require('lodash/object/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
var Calendar = _react2.default.createClass({
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
     * Callback fired when dragging a selection in the Time views.
     *
     * Returning `false` from the handler will prevent a selection.
     *
     * ```js
     * function ({ start: Date, end: Date }) : boolean
     * ```
     */
    onSelecting: _react.PropTypes.func,

    /**
     * An array of built-in view names to allow the calendar to display.
     *
     * @type Calendar.views
     * @default ['month', 'week', 'day', 'agenda']
     */
    views: _propTypes.views,

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
     * Determines the selectable time increments in week and day views
     */
    step: _react2.default.PropTypes.number,

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
    titleAccessor: _propTypes.accessor,

    /**
     * Determines whether the event should be considered an "all day" event and ignore time.
     * Must resolve to a `boolean` value.
     *
     * @type {(func|string)}
     */
    allDayAccessor: _propTypes.accessor,

    /**
     * The start date/time of the event. Must resolve to a JavaScript `Date` object.
     *
     * @type {(func|string)}
     */
    startAccessor: _propTypes.accessor,

    /**
     * The end date/time of the event. Must resolve to a JavaScript `Date` object.
     *
     * @type {(func|string)}
     */
    endAccessor: _propTypes.accessor,

    /**
     * Constrains the minimum _time_ of the Day and Week views.
     */
    min: _react.PropTypes.instanceOf(Date),

    /**
     * Constrains the maximum _time_ of the Day and Week views.
     */
    max: _react.PropTypes.instanceOf(Date),

    /**
     * Determines how far down the scroll pane is initially scrolled down.
     */
    scrollToTime: _react.PropTypes.instanceOf(Date),

    /**
     * Localizer specific formats, tell the Calendar how to format and display dates.
     */
    formats: _react.PropTypes.shape({
      /**
       * Format for the day of the month heading in the Month view.
       */
      dateFormat: _propTypes.dateFormat,

      /**
       * A day of the week format for Week and Day headings
       */
      dayFormat: _propTypes.dateFormat,
      /**
       * Week day name format for the Month week day headings.
       */
      weekdayFormat: _propTypes.dateFormat,

      /**
       * Toolbar header format for the Month view.
       */
      monthHeaderFormat: _propTypes.dateFormat,
      /**
       * Toolbar header format for the Week views.
       */
      weekHeaderFormat: _propTypes.dateFormat,
      /**
       * Toolbar header format for the Day view.
       */
      dayHeaderFormat: _propTypes.dateFormat,

      /**
       * Toolbar header format for the Agenda view.
       */
      agendaHeaderFormat: _propTypes.dateFormat,

      /**
       * A time range format for selecting time slots.
       */
      selectRangeFormat: _propTypes.dateFormat,

      agendaDateFormat: _propTypes.dateFormat,
      agendaTimeFormat: _propTypes.dateFormat,
      agendaTimeRangeFormat: _propTypes.dateFormat
    }),

    /**
     * Customize how different sections of the calendar render by providing custom Components.
     * In particular the `Event` component can be specified for the entire calendar, or you can
     * provide an individual component for each view type.
     *
     * ```jsx
     * let components = {
     *   event: MyEvent, // used by each view (Month, Day, Week)
     *   toolbar: MyToolbar,
     *   agenda: {
     *   	 event: MyAgendaEvent // with the agenda view use a different component to render events
     *   }
     * }
     * <Calendar components={components} />
     * ```
     */
    components: _react.PropTypes.shape({
      event: _propTypes.elementType,

      toolbar: _propTypes.elementType,

      agenda: _react.PropTypes.shape({
        date: _propTypes.elementType,
        time: _propTypes.elementType,
        event: _propTypes.elementType
      }),

      day: _react.PropTypes.shape({ event: _propTypes.elementType }),
      week: _react.PropTypes.shape({ event: _propTypes.elementType }),
      month: _react.PropTypes.shape({ event: _propTypes.elementType })
    }),

    /**
     * String messages used throughout the component, override to provide localizations
     */
    messages: _react.PropTypes.shape({
      allDay: _react.PropTypes.node,
      previous: _react.PropTypes.node,
      next: _react.PropTypes.node,
      today: _react.PropTypes.node,
      month: _react.PropTypes.node,
      week: _react.PropTypes.node,
      day: _react.PropTypes.node,
      agenda: _react.PropTypes.node,
      showMore: _react.PropTypes.func
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      popup: false,
      toolbar: true,
      view: _constants.views.MONTH,
      views: [_constants.views.MONTH, _constants.views.WEEK, _constants.views.DAY, _constants.views.AGENDA],
      date: now,
      step: 30,

      titleAccessor: 'title',
      allDayAccessor: 'allDay',
      startAccessor: 'start',
      endAccessor: 'end'
    };
  },
  getViews: function getViews() {
    var views = this.props.views;

    if (Array.isArray(views)) {
      return (0, _transform2.default)(views, function (obj, name) {
        return obj[name] = _Views2.default[name];
      }, {});
    }

    if ((typeof views === 'undefined' ? 'undefined' : _typeof(views)) === 'object') {
      return (0, _mapValues2.default)(views, function (value, key) {
        if (value === true) {
          return _Views2.default[key];
        }

        return value;
      });
    }

    return _Views2.default;
  },
  getView: function getView() {
    var views = this.getViews();

    return views[this.props.view];
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

    formats = (0, _formats2.default)(formats);

    var View = this.getView();
    var names = viewNames(this.props.views);

    var elementProps = (0, _omit2.default)(this.props, Object.keys(Calendar.propTypes));

    var viewComponents = (0, _defaults2.default)(components[view] || {}, (0, _omit2.default)(components, names));

    var ToolbarToRender = components.toolbar || _Toolbar2.default;

    return _react2.default.createElement(
      'div',
      _extends({}, elementProps, {
        className: (0, _classnames2.default)('rbc-calendar', className, {
          'rbc-rtl': props.rtl
        }),
        style: style
      }),
      toolbar && _react2.default.createElement(ToolbarToRender, {
        date: current,
        view: view,
        views: names,
        label: (0, _viewLabel2.default)(current, view, formats, culture),
        onViewChange: this._view,
        onNavigate: this._navigate,
        messages: this.props.messages
      }),
      _react2.default.createElement(View, _extends({
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


    date = (0, _move2.default)(action, newDate || date, view);

    onNavigate(date, view);

    if (action === _constants.navigate.DATE) this._viewNavigate(date);
  },
  _viewNavigate: function _viewNavigate(nextDate) {
    var _props3 = this.props;
    var view = _props3.view;
    var date = _props3.date;
    var culture = _props3.culture;


    if (_dates2.default.eq(date, nextDate, view, _localizer2.default.startOfWeek(culture))) {
      this._view(_constants.views.DAY);
    }
  },
  _view: function _view(view) {
    if (view !== this.props.view && isValidView(view, this.props)) this.props.onView(view);
  },
  _select: function _select(event) {
    (0, _helpers.notify)(this.props.onSelectEvent, event);
  },
  _selectSlot: function _selectSlot(slotInfo) {
    (0, _helpers.notify)(this.props.onSelectSlot, slotInfo);
  },
  _headerClick: function _headerClick(date) {
    var view = this.props.view;


    if (view === _constants.views.MONTH || view === _constants.views.WEEK) this._view(_constants.views.day);

    this._navigate(_constants.navigate.DATE, date);
  }
});

exports.default = (0, _uncontrollable2.default)(Calendar, {
  view: 'onView',
  date: 'onNavigate',
  selected: 'onSelectEvent'
});
module.exports = exports['default'];