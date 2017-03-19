'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('./utils/propTypes');

var _helpers = require('./utils/helpers');

var _constants = require('./utils/constants');

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

var _EventWrapper = require('./EventWrapper');

var _EventWrapper2 = _interopRequireDefault(_EventWrapper);

var _BackgroundWrapper = require('./BackgroundWrapper');

var _BackgroundWrapper2 = _interopRequireDefault(_BackgroundWrapper);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _defaults = require('lodash/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _transform = require('lodash/transform');

var _transform2 = _interopRequireDefault(_transform);

var _mapValues = require('lodash/mapValues');

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
     * Props passed to main calendar `<div>`.
     */
    elementProps: _react.PropTypes.object,

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
     * <b>- MultiView ONLY -</b>
     * An object containing key-value pairs where the key is an entity key,
     * such as a person ID, and the value is an array of events associated with
     * that entity
     */
    eventMap: _react.PropTypes.object,

    /**
     * <b>- MultiView ONLY -</b>
     * An array of entity objects
     */
    entities: _react.PropTypes.arrayOf(_react.PropTypes.object),

    /**
     * <b>- MultiView ONLY -</b>
     * The name of the property to treat as entities' unique identifiers,
     * e.g. `id`
     */
    entityKeyAccessor: _react.PropTypes.string,

    /**
     * <b>- MultiView ONLY -</b>
     * The name of a given entity. Must resolve to a `renderable` object, but
     * should specifically be a `string`.
     *
     * @type {(func|string)}
     */
    entityNameAccessor: _propTypes.accessor,

    /**
     * True if the calendar should only support single day events and exclude
     * all-day and multi-day events.
     */
    singleDayEventsOnly: _react.PropTypes.bool,

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
     *     start: Date,
     *     end: Date,
     *     slots: array<Date>,
     *     entityKey: number | string (undefined unless current view is MultiView)
     *   }
     * )
     * ```
     */
    onSelectSlot: _react.PropTypes.func,

    /**
     * Callback fired when a calendar event is selected.
     *
     * ```js
     * function(event: object, e: SyntheticEvent)
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
     * The string name of the destination view for drill-down actions, such
     * as clicking a date header, or the truncated events links. If
     * `getDrilldownView` is also specified it will be used instead.
     *
     * Set to `null` to disable drill-down actions.
     *
     * ```js
     * <BigCalendar
     *   drilldownView="agenda"
     * />
     * ```
     */
    drilldownView: _react2.default.PropTypes.string,

    /**
     * Functionally equivalent to `drilldownView`, but accepts a function
     * that can return a view name. It's useful for customizing the drill-down
     * actions depending on the target date and triggering view.
     *
     * Return `null` to disable drill-down actions.
     *
     * ```js
     * <BigCalendar
     *   getDrilldownView={(targetDate, currentViewName, configuredViewNames) =>
     *     if (currentViewName === 'month' && configuredViewNames.includes('week'))
     *       return 'week'
     *
     *     return null;
     *   }}
     * />
     * ```
     */
    getDrilldownView: _react2.default.PropTypes.func,

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
     *
     * The 'ignoreEvents' option prevents selection code from running when a
     * drag begins over an event. Useful when you want custom event click or drag
     * logic
     */
    selectable: _react2.default.PropTypes.oneOf([true, false, 'ignoreEvents']),

    /**
     * Determines the selectable time increments in week and day views
     */
    step: _react2.default.PropTypes.number,

    /**
     * The number of pixels to reserve on the right side of each column for
     * clickable space. This allows cells to be clicked even if there is an
     * event that covers the timespan represented by the cell.
     */
    rightOffset: _react2.default.PropTypes.number,

    /**
     * The number of slots per "section" in the time grid views. Adjust with `step`
     * to change the default of 1 hour long groups, with 30 minute slots.
     */
    timeslots: _react2.default.PropTypes.number,

    /**
     * The height, in pixels, of each vertical time grouping in the calendar.
     * If omitted, will default to the value specified in the stylesheet for
     * the `rbc-timeslot-group` class.
     */
    groupHeight: _react2.default.PropTypes.number,

    /**
     *Switch the calendar to a `right-to-left` read direction.
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
     * Specify a specific culture code for the Calendar.
     *
     * **Note: it's generally better to handle this globally via your i18n library.**
     */
    culture: _react2.default.PropTypes.string,

    /**
     * Localizer specific formats, tell the Calendar how to format and display dates.
     *
     * `format` types are dependent on the configured localizer; both Moment and Globalize
     * accept strings of tokens according to their own specification, such as: `'DD mm yyyy'`.
     *
     * ```jsx
     * let formats = {
     *   dateFormat: 'dd',
     *
     *   dayFormat: (date, culture, localizer) =>
     *     localizer.format(date, 'DDD', culture),
     *
     *   dayRangeHeaderFormat: ({ start, end }, culture, local) =>
     *     local.format(start, { date: 'short' }, culture) + ' — ' +
     *     local.format(end, { date: 'short' }, culture)
     * }
     *
     * <Calendar formats={formats} />
     * ```
     *
     * All localizers accept a function of
     * the form `(date: Date, culture: ?string, localizer: Localizer) -> string`
     */
    formats: _react.PropTypes.shape({
      /**
       * Format for the day of the month heading in the Month view.
       * e.g. "01", "02", "03", etc
       */
      dateFormat: _propTypes.dateFormat,

      /**
       * A day of the week format for Week and Day headings,
       * e.g. "Wed 01/04"
       *
       */
      dayFormat: _propTypes.dateFormat,

      /**
       * Week day name format for the Month week day headings,
       * e.g: "Sun", "Mon", "Tue", etc
       *
       */
      weekdayFormat: _propTypes.dateFormat,

      /**
       * The timestamp cell formats in Week and Time views, e.g. "4:00 AM"
       */
      timeGutterFormat: _propTypes.dateFormat,

      /**
       * Toolbar header format for the Month view, e.g "2015 April"
       *
       */
      monthHeaderFormat: _propTypes.dateFormat,

      /**
       * Toolbar header format for the Week views, e.g. "Mar 29 - Apr 04"
       */
      dayRangeHeaderFormat: _propTypes.dateRangeFormat,

      /**
       * Toolbar header format for the Day view, e.g. "Wednesday Apr 01"
       */
      dayHeaderFormat: _propTypes.dateFormat,

      /**
       * Toolbar header format for the Agenda view, e.g. "4/1/2015 — 5/1/2015"
       */
      agendaHeaderFormat: _propTypes.dateFormat,

      /**
       * A time range format for selecting time slots, e.g "8:00am — 2:00pm"
       */
      selectRangeFormat: _propTypes.dateRangeFormat,

      agendaDateFormat: _propTypes.dateFormat,
      agendaTimeFormat: _propTypes.dateFormat,
      agendaTimeRangeFormat: _propTypes.dateRangeFormat,

      /**
       * Time range displayed on events.
       */
      eventTimeRangeFormat: _propTypes.dateRangeFormat
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
      eventWrapper: _propTypes.elementType,
      dayWrapper: _propTypes.elementType,
      dateCellWrapper: _propTypes.elementType,

      toolbar: _propTypes.elementType,

      agenda: _react.PropTypes.shape({
        date: _propTypes.elementType,
        time: _propTypes.elementType,
        event: _propTypes.elementType
      }),

      day: _react.PropTypes.shape({
        header: _propTypes.elementType,
        event: _propTypes.elementType
      }),
      week: _react.PropTypes.shape({
        header: _propTypes.elementType,
        event: _propTypes.elementType
      }),
      month: _react.PropTypes.shape({
        header: _propTypes.elementType,
        event: _propTypes.elementType
      })
    }),

    /**
     * Customize the props provided to different sections of the calendar. This
     * prop should typically be used when supplying custom components with
     * the `components` prop, for example to supply callbacks to the custom
     * components.
     *
     * ```jsx
     * let componentProps = {
     *   toolbar: { onUserChange: (event) => this.setState({ userId: event.target.value })},
     *   [...]
     * }
     * <Calendar componentProps={componentProps} />
     * ```
     *
     * Note: only implemented for toolbar at the moment.
     */
    componentProps: _react.PropTypes.shape({
      event: _react.PropTypes.object,
      eventWrapper: _react.PropTypes.object,
      dayWrapper: _react.PropTypes.object,
      dateCellWrapper: _react.PropTypes.object,

      toolbar: _react.PropTypes.object,

      agenda: _react.PropTypes.shape({
        date: _react.PropTypes.object,
        time: _react.PropTypes.object,
        event: _react.PropTypes.object
      }),

      day: _react.PropTypes.shape({
        header: _react.PropTypes.object,
        event: _react.PropTypes.object
      }),
      week: _react.PropTypes.shape({
        header: _react.PropTypes.object,
        event: _react.PropTypes.object
      }),
      month: _react.PropTypes.shape({
        header: _react.PropTypes.object,
        event: _react.PropTypes.object
      })
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
      elementProps: {},
      popup: false,
      toolbar: true,
      view: _constants.views.MONTH,
      views: [_constants.views.MONTH, _constants.views.WEEK, _constants.views.DAY, _constants.views.AGENDA],
      date: now,
      step: 30,

      drilldownView: _constants.views.DAY,

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
  getDrilldownView: function getDrilldownView(date) {
    var _props = this.props,
        view = _props.view,
        drilldownView = _props.drilldownView,
        getDrilldownView = _props.getDrilldownView;


    if (!getDrilldownView) return drilldownView;

    return getDrilldownView(date, view, Object.keys(this.getViews()));
  },
  render: function render() {
    var _props2 = this.props,
        view = _props2.view,
        toolbar = _props2.toolbar,
        events = _props2.events,
        singleDayEventsOnly = _props2.singleDayEventsOnly,
        culture = _props2.culture,
        _props2$components = _props2.components,
        components = _props2$components === undefined ? {} : _props2$components,
        _props2$componentProp = _props2.componentProps,
        componentProps = _props2$componentProp === undefined ? {} : _props2$componentProp,
        _props2$formats = _props2.formats,
        formats = _props2$formats === undefined ? {} : _props2$formats,
        style = _props2.style,
        className = _props2.className,
        elementProps = _props2.elementProps,
        current = _props2.date,
        props = _objectWithoutProperties(_props2, ['view', 'toolbar', 'events', 'singleDayEventsOnly', 'culture', 'components', 'componentProps', 'formats', 'style', 'className', 'elementProps', 'date']);

    formats = (0, _formats2.default)(formats);

    var View = this.getView();
    var names = viewNames(this.props.views);

    var viewComponents = (0, _defaults2.default)(components[view] || {}, (0, _omit2.default)(components, names), {
      eventWrapper: _EventWrapper2.default,
      dayWrapper: _BackgroundWrapper2.default,
      dateCellWrapper: _BackgroundWrapper2.default
    });

    var ToolbarToRender = components.toolbar || _Toolbar2.default;
    var toolbarProps = componentProps.toolbar || {};

    return _react2.default.createElement(
      'div',
      _extends({}, elementProps, {
        className: (0, _classnames2.default)('rbc-calendar', className, {
          'rbc-rtl': props.rtl
        }),
        style: style
      }),
      toolbar && _react2.default.createElement(ToolbarToRender, _extends({
        date: current,
        view: view,
        views: names,
        label: (0, _viewLabel2.default)(current, view, formats, culture),
        onViewChange: this.handleViewChange,
        onNavigate: this.handleNavigate,
        messages: this.props.messages
      }, toolbarProps)),
      _react2.default.createElement(View, _extends({
        ref: 'view'
      }, props, formats, {
        culture: culture,
        formats: undefined,
        events: events,
        singleDayEventsOnly: singleDayEventsOnly,
        date: current,
        components: viewComponents,
        getDrilldownView: this.getDrilldownView,
        onNavigate: this.handleNavigate,
        onDrillDown: this.handleDrillDown,
        onSelectEvent: this.handleSelectEvent,
        onSelectSlot: this.handleSelectSlot,
        onShowMore: this._showMore
      }))
    );
  },
  handleNavigate: function handleNavigate(action, newDate) {
    var _props3 = this.props,
        view = _props3.view,
        date = _props3.date,
        onNavigate = _props3.onNavigate;

    var ViewComponent = this.getView();

    date = (0, _move2.default)(action, newDate || date, ViewComponent);

    onNavigate(date, view);
  },
  handleViewChange: function handleViewChange(view) {
    if (view !== this.props.view && isValidView(view, this.props)) this.props.onView(view);
  },
  handleSelectEvent: function handleSelectEvent() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (0, _helpers.notify)(this.props.onSelectEvent, args);
  },
  handleSelectSlot: function handleSelectSlot(slotInfo) {
    (0, _helpers.notify)(this.props.onSelectSlot, slotInfo);
  },
  handleDrillDown: function handleDrillDown(date, view) {
    if (view) this.handleViewChange(view);

    this.handleNavigate(_constants.navigate.DATE, date);
  }
});

exports.default = (0, _uncontrollable2.default)(Calendar, {
  view: 'onView',
  date: 'onNavigate'
});
module.exports = exports['default'];