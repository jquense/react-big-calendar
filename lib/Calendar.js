'use strict'

exports.__esModule = true

var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function(obj) {
        return typeof obj
      }
    : function(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj
      }

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _uncontrollable = require('uncontrollable')

var _uncontrollable2 = _interopRequireDefault(_uncontrollable)

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _propTypes3 = require('./utils/propTypes')

var _helpers = require('./utils/helpers')

var _constants = require('./utils/constants')

var _formats = require('./formats')

var _formats2 = _interopRequireDefault(_formats)

var _messages = require('./utils/messages')

var _messages2 = _interopRequireDefault(_messages)

var _move = require('./utils/move')

var _move2 = _interopRequireDefault(_move)

var _Views = require('./Views')

var _Views2 = _interopRequireDefault(_Views)

var _Toolbar = require('./Toolbar')

var _Toolbar2 = _interopRequireDefault(_Toolbar)

var _EventWrapper = require('./EventWrapper')

var _EventWrapper2 = _interopRequireDefault(_EventWrapper)

var _BackgroundWrapper = require('./BackgroundWrapper')

var _BackgroundWrapper2 = _interopRequireDefault(_BackgroundWrapper)

var _omit = require('lodash/omit')

var _omit2 = _interopRequireDefault(_omit)

var _defaults = require('lodash/defaults')

var _defaults2 = _interopRequireDefault(_defaults)

var _transform = require('lodash/transform')

var _transform2 = _interopRequireDefault(_transform)

var _mapValues = require('lodash/mapValues')

var _mapValues2 = _interopRequireDefault(_mapValues)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _objectWithoutProperties(obj, keys) {
  var target = {}
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

function viewNames(_views) {
  return !Array.isArray(_views) ? Object.keys(_views) : _views
}

function isValidView(view, _ref) {
  var _views = _ref.views

  var names = viewNames(_views)
  return names.indexOf(view) !== -1
}

/**
 * react-big-calendar is a full featured Calendar component for managing events and dates. It uses
 * modern `flexbox` for layout, making it super responsive and performant. Leaving most of the layout heavy lifting
 * to the browser. __note:__ The default styles use `height: 100%` which means your container must set an explicit
 * height (feel free to adjust the styles to suit your specific needs).
 *
 * Big Calendar is unopiniated about editing and moving events, preferring to let you implement it in a way that makes
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
/**
 *
 *
 * @static
 * @memberof Calendar
 */

var Calendar = (function(_React$Component) {
  _inherits(Calendar, _React$Component)

  function Calendar() {
    var _temp, _this, _ret

    _classCallCheck(this, Calendar)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        _React$Component.call.apply(_React$Component, [this].concat(args))
      )),
      _this)),
      _initialiseProps.call(_this),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    )
  }

  Calendar.prototype.render = function render() {
    var _props = this.props,
      view = _props.view,
      toolbar = _props.toolbar,
      events = _props.events,
      culture = _props.culture,
      _props$components = _props.components,
      components = _props$components === undefined ? {} : _props$components,
      _props$formats = _props.formats,
      formats = _props$formats === undefined ? {} : _props$formats,
      _props$messages = _props.messages,
      messages = _props$messages === undefined ? {} : _props$messages,
      style = _props.style,
      className = _props.className,
      elementProps = _props.elementProps,
      current = _props.date,
      getNow = _props.getNow,
      length = _props.length,
      props = _objectWithoutProperties(_props, [
        'view',
        'toolbar',
        'events',
        'culture',
        'components',
        'formats',
        'messages',
        'style',
        'className',
        'elementProps',
        'date',
        'getNow',
        'length',
      ])

    current = current || getNow()

    formats = (0, _formats2.default)(formats)
    messages = (0, _messages2.default)(messages)

    var View = this.getView()
    var names = viewNames(this.props.views)

    var viewComponents = (0, _defaults2.default)(
      components[view] || {},
      (0, _omit2.default)(components, names),
      {
        eventWrapper: _EventWrapper2.default,
        dayWrapper: _BackgroundWrapper2.default,
        dateCellWrapper: _BackgroundWrapper2.default,
      }
    )

    var CalToolbar = components.toolbar || _Toolbar2.default
    var label = View.title(current, {
      formats: formats,
      culture: culture,
      length: length,
    })

    return _react2.default.createElement(
      'div',
      _extends({}, elementProps, {
        className: (0, _classnames2.default)('rbc-calendar', className, {
          'rbc-rtl': props.rtl,
        }),
        style: style,
      }),
      toolbar &&
        _react2.default.createElement(CalToolbar, {
          date: current,
          view: view,
          views: names,
          label: label,
          onViewChange: this.handleViewChange,
          onNavigate: this.handleNavigate,
          messages: messages,
        }),
      _react2.default.createElement(
        View,
        _extends(
          {
            ref: 'view',
          },
          props,
          formats,
          {
            messages: messages,
            culture: culture,
            formats: undefined,
            events: events,
            date: current,
            getNow: getNow,
            length: length,
            components: viewComponents,
            getDrilldownView: this.getDrilldownView,
            onNavigate: this.handleNavigate,
            onDrillDown: this.handleDrillDown,
            onSelectEvent: this.handleSelectEvent,
            onDoubleClickEvent: this.handleDoubleClickEvent,
            onSelectSlot: this.handleSelectSlot,
            onShowMore: this._showMore,
          }
        )
      )
    )
  }

  return Calendar
})(_react2.default.Component)

Calendar.propTypes = {
  /**
   * Props passed to main calendar `<div>`.
   *
   */
  elementProps: _propTypes2.default.object,

  /**
   * The current date value of the calendar. Determines the visible view range.
   * If `date` is omitted then the result of `getNow` is used; otherwise the
   * current date is used.
   *
   * @controllable onNavigate
   */
  date: _propTypes2.default.instanceOf(Date),

  /**
   * The current view of the calendar.
   *
   * @default 'month'
   * @controllable onView
   */
  view: _propTypes2.default.string,

  /**
   * The initial view set for the Calendar.
   * @type Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')
   * @default 'month'
   */
  defaultView: _propTypes2.default.string,

  /**
   * An array of event objects to display on the calendar. Events objects
   * can be any shape, as long as the Calendar knows how to retrieve the
   * following details of the event:
   *
   *  - start time
   *  - end time
   *  - title
   *  - whether its an "all day" event or not
   *  - any resource the event may be a related too
   *
   * Each of these properties can be customized or generated dynamically by
   * setting the various "accessor" props. Without any configuration the default
   * event should look like:
   *
   * ```js
   * Event {
   *   title: string,
   *   start: Date,
   *   end: Date,
   *   allDay?: boolean
   *   resource?: any,
   * }
   * ```
   */
  events: _propTypes2.default.arrayOf(_propTypes2.default.object),

  /**
   * Accessor for the event title, used to display event information. Should
   * resolve to a `renderable` value.
   *
   * ```js
   * string | (event: Object) => string
   * ```
   *
   * @type {(func|string)}
   */
  titleAccessor: _propTypes3.accessor,

  /**
   * Accessor for the event tooltip. Should
   * resolve to a `renderable` value. Removes the tooltip if null.
   *
   * ```js
   * string | (event: Object) => string
   * ```
   *
   * @type {(func|string)}
   */
  tooltipAccessor: _propTypes3.accessor,

  /**
   * Determines whether the event should be considered an "all day" event and ignore time.
   * Must resolve to a `boolean` value.
   *
   * ```js
   * string | (event: Object) => boolean
   * ```
   *
   * @type {(func|string)}
   */
  allDayAccessor: _propTypes3.accessor,

  /**
   * The start date/time of the event. Must resolve to a JavaScript `Date` object.
   *
   * ```js
   * string | (event: Object) => Date
   * ```
   *
   * @type {(func|string)}
   */
  startAccessor: _propTypes3.accessor,

  /**
   * The end date/time of the event. Must resolve to a JavaScript `Date` object.
   *
   * ```js
   * string | (event: Object) => Date
   * ```
   *
   * @type {(func|string)}
   */
  endAccessor: _propTypes3.accessor,

  /**
   * Returns the id of the `resource` that the event is a member of. This
   * id should match at least one resource in the `resources` array.
   *
   * ```js
   * string | (event: Object) => Date
   * ```
   *
   * @type {(func|string)}
   */
  resourceAccessor: _propTypes3.accessor,

  /**
   * An array of resource objects that map events to a specific resource.
   * Resource objects, like events, can be any shape or have any properties,
   * but should be uniquly identifiable via the `resourceIdAccessor`, as
   * well as a "title" or name as provided by the `resourceTitleAccessor` prop.
   */
  resources: _propTypes2.default.arrayOf(_propTypes2.default.object),

  /**
   * Provides a unique identifier for each resource in the `resources` array
   *
   * ```js
   * string | (resource: Object) => any
   * ```
   *
   * @type {(func|string)}
   */
  resourceIdAccessor: _propTypes3.accessor,

  /**
   * Provides a human readable name for the resource object, used in headers.
   *
   * ```js
   * string | (resource: Object) => any
   * ```
   *
   * @type {(func|string)}
   */
  resourceTitleAccessor: _propTypes3.accessor,

  /**
   * Determines the current date/time which is highlighted in the views.
   *
   * The value affects which day is shaded and which time is shown as
   * the current time. It also affects the date used by the Today button in
   * the toolbar.
   *
   * Providing a value here can be useful when you are implementing time zones
   * using the `startAccessor` and `endAccessor` properties.
   *
   * @type {func}
   * @default () => new Date()
   */
  getNow: _propTypes2.default.func,

  /**
   * Callback fired when the `date` value changes.
   *
   * @controllable date
   */
  onNavigate: _propTypes2.default.func,

  /**
   * Callback fired when the `view` value changes.
   *
   * @controllable view
   */
  onView: _propTypes2.default.func,

  /**
   * Callback fired when date header, or the truncated events links are clicked
   *
   */
  onDrillDown: _propTypes2.default.func,

  /**
   * A callback fired when a date selection is made. Only fires when `selectable` is `true`.
   *
   * ```js
   * (
   *   slotInfo: {
   *     start: Date,
   *     end: Date,
   *     slots: Array<Date>,
   *     action: "select" | "click" | "doubleClick"
   *   }
   * ) => any
   * ```
   */
  onSelectSlot: _propTypes2.default.func,

  /**
   * Callback fired when a calendar event is selected.
   *
   * ```js
   * (event: Object, e: SyntheticEvent) => any
   * ```
   *
   * @controllable selected
   */
  onSelectEvent: _propTypes2.default.func,

  /**
   * Callback fired when a calendar event is clicked twice.
   *
   * ```js
   * (event: Object, e: SyntheticEvent) => void
   * ```
   */
  onDoubleClickEvent: _propTypes2.default.func,

  /**
   * Callback fired when dragging a selection in the Time views.
   *
   * Returning `false` from the handler will prevent a selection.
   *
   * ```js
   * (range: { start: Date, end: Date }) => ?boolean
   * ```
   */
  onSelecting: _propTypes2.default.func,

  /**
   * The selected event, if any.
   */
  selected: _propTypes2.default.object,

  /**
   * An array of built-in view names to allow the calendar to display.
   * accepts either an array of builtin view names,
   *
   * ```jsx
   * views={['month', 'day', 'agenda']}
   * ```
   * or an object hash of the view name and the component (or boolean for builtin).
   *
   * ```jsx
   * views={{
   *   month: true,
   *   week: false,
   *   myweek: WorkWeekViewComponent,
   * }}
   * ```
   *
   * Custom views can be any React component, that implements the following
   * interface:
   *
   * ```js
   * interface View {
   *   static title(date: Date, { formats: DateFormat[], culture: string?, ...props }): string
   *   static navigate(date: Date, action: 'PREV' | 'NEXT' | 'DATE'): Date
   * }
   * ```
   *
   * @type Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')
   * @View
   ['month', 'week', 'day', 'agenda']
   */
  views: _propTypes3.views,

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
  drilldownView: _propTypes2.default.string,

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
  getDrilldownView: _propTypes2.default.func,

  /**
   * Determines the end date from date prop in the agenda view
   * date prop + length (in number of days) = end date
   */
  length: _propTypes2.default.number,

  /**
   * Determines whether the toolbar is displayed
   */
  toolbar: _propTypes2.default.bool,

  /**
   * Show truncated events in an overlay when you click the "+_x_ more" link.
   */
  popup: _propTypes2.default.bool,

  /**
   * Distance in pixels, from the edges of the viewport, the "show more" overlay should be positioned.
   *
   * ```jsx
   * <BigCalendar popupOffset={30}/>
   * <BigCalendar popupOffset={{x: 30, y: 20}}/>
   * ```
   */
  popupOffset: _propTypes2.default.oneOfType([
    _propTypes2.default.number,
    _propTypes2.default.shape({
      x: _propTypes2.default.number,
      y: _propTypes2.default.number,
    }),
  ]),

  /**
   * Allows mouse selection of ranges of dates/times.
   *
   * The 'ignoreEvents' option prevents selection code from running when a
   * drag begins over an event. Useful when you want custom event click or drag
   * logic
   */
  selectable: _propTypes2.default.oneOf([true, false, 'ignoreEvents']),

  /** Determines whether you want events to be resizable */
  resizable: _propTypes2.default.bool,

  /**
   * Specifies the number of miliseconds the user must press and hold on the screen for a touch
   * to be considered a "long press." Long presses are used for time slot selection on touch
   * devices.
   *
   * @type {number}
   * @default 250
   */
  longPressThreshold: _propTypes2.default.number,

  /**
   * Determines the selectable time increments in week and day views
   */
  step: _propTypes2.default.number,

  /**
   * The number of slots per "section" in the time grid views. Adjust with `step`
   * to change the default of 1 hour long groups, with 30 minute slots.
   */
  timeslots: _propTypes2.default.number,

  /**
   *Switch the calendar to a `right-to-left` read direction.
   */
  rtl: _propTypes2.default.bool,

  /**
   * Optionally provide a function that returns an object of className or style props
   * to be applied to the the event node.
   *
   * ```js
   * (
   * 	event: Object,
   * 	start: Date,
   * 	end: Date,
   * 	isSelected: boolean
   * ) => { className?: string, style?: Object }
   * ```
   */
  eventPropGetter: _propTypes2.default.func,

  /**
   * Optionally provide a function that returns an object of className or style props
   * to be applied to the the time-slot node. Caution! Styles that change layout or
   * position may break the calendar in unexpected ways.
   *
   * ```js
   * (date: Date) => { className?: string, style?: Object }
   * ```
   */
  slotPropGetter: _propTypes2.default.func,

  /**
   * Optionally provide a function that returns an object of className or style props
   * to be applied to the the day background. Caution! Styles that change layout or
   * position may break the calendar in unexpected ways.
   *
   * ```js
   * (date: Date) => { className?: string, style?: Object }
   * ```
   */
  dayPropGetter: _propTypes2.default.func,

  /**
   * Support to show multi-day events with specific start and end times in the
   * main time grid (rather than in the all day header).
   *
   * **Note: This may cause calendars with several events to look very busy in
   * the week and day views.**
   */
  showMultiDayTimes: _propTypes2.default.bool,

  /**
   * Constrains the minimum _time_ of the Day and Week views.
   */
  min: _propTypes2.default.instanceOf(Date),

  /**
   * Constrains the maximum _time_ of the Day and Week views.
   */
  max: _propTypes2.default.instanceOf(Date),

  /**
   * Determines how far down the scroll pane is initially scrolled down.
   */
  scrollToTime: _propTypes2.default.instanceOf(Date),

  /**
   * Specify a specific culture code for the Calendar.
   *
   * **Note: it's generally better to handle this globally via your i18n library.**
   */
  culture: _propTypes2.default.string,

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
  formats: _propTypes2.default.shape({
    /**
     * Format for the day of the month heading in the Month view.
     * e.g. "01", "02", "03", etc
     */
    dateFormat: _propTypes3.dateFormat,

    /**
     * A day of the week format for Week and Day headings,
     * e.g. "Wed 01/04"
     *
     */
    dayFormat: _propTypes3.dateFormat,

    /**
     * Week day name format for the Month week day headings,
     * e.g: "Sun", "Mon", "Tue", etc
     *
     */
    weekdayFormat: _propTypes3.dateFormat,

    /**
     * The timestamp cell formats in Week and Time views, e.g. "4:00 AM"
     */
    timeGutterFormat: _propTypes3.dateFormat,

    /**
     * Toolbar header format for the Month view, e.g "2015 April"
     *
     */
    monthHeaderFormat: _propTypes3.dateFormat,

    /**
     * Toolbar header format for the Week views, e.g. "Mar 29 - Apr 04"
     */
    dayRangeHeaderFormat: _propTypes3.dateRangeFormat,

    /**
     * Toolbar header format for the Day view, e.g. "Wednesday Apr 01"
     */
    dayHeaderFormat: _propTypes3.dateFormat,

    /**
     * Toolbar header format for the Agenda view, e.g. "4/1/2015 — 5/1/2015"
     */
    agendaHeaderFormat: _propTypes3.dateRangeFormat,

    /**
     * A time range format for selecting time slots, e.g "8:00am — 2:00pm"
     */
    selectRangeFormat: _propTypes3.dateRangeFormat,

    agendaDateFormat: _propTypes3.dateFormat,
    agendaTimeFormat: _propTypes3.dateFormat,
    agendaTimeRangeFormat: _propTypes3.dateRangeFormat,

    /**
     * Time range displayed on events.
     */
    eventTimeRangeFormat: _propTypes3.dateRangeFormat,

    /**
     * An optional event time range for events that continue onto another day
     */
    eventTimeRangeStartFormat: _propTypes3.dateFormat,

    /**
     * An optional event time range for events that continue from another day
     */
    eventTimeRangeEndFormat: _propTypes3.dateFormat,
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
  components: _propTypes2.default.shape({
    event: _propTypes3.elementType,
    eventWrapper: _propTypes3.elementType,
    dayWrapper: _propTypes3.elementType,
    dateCellWrapper: _propTypes3.elementType,

    toolbar: _propTypes3.elementType,

    agenda: _propTypes2.default.shape({
      date: _propTypes3.elementType,
      time: _propTypes3.elementType,
      event: _propTypes3.elementType,
    }),

    day: _propTypes2.default.shape({
      header: _propTypes3.elementType,
      event: _propTypes3.elementType,
    }),
    week: _propTypes2.default.shape({
      header: _propTypes3.elementType,
      event: _propTypes3.elementType,
    }),
    month: _propTypes2.default.shape({
      header: _propTypes3.elementType,
      dateHeader: _propTypes3.elementType,
      event: _propTypes3.elementType,
    }),
  }),

  /**
   * String messages used throughout the component, override to provide localizations
   */
  messages: _propTypes2.default.shape({
    allDay: _propTypes2.default.node,
    previous: _propTypes2.default.node,
    next: _propTypes2.default.node,
    today: _propTypes2.default.node,
    month: _propTypes2.default.node,
    week: _propTypes2.default.node,
    day: _propTypes2.default.node,
    agenda: _propTypes2.default.node,
    date: _propTypes2.default.node,
    time: _propTypes2.default.node,
    event: _propTypes2.default.node,
    showMore: _propTypes2.default.func,
  }),
}
Calendar.defaultProps = {
  elementProps: {},
  popup: false,
  toolbar: true,
  view: _constants.views.MONTH,
  views: [
    _constants.views.MONTH,
    _constants.views.WEEK,
    _constants.views.DAY,
    _constants.views.AGENDA,
  ],
  step: 30,
  length: 30,

  drilldownView: _constants.views.DAY,

  titleAccessor: 'title',
  tooltipAccessor: 'title',
  allDayAccessor: 'allDay',
  startAccessor: 'start',
  endAccessor: 'end',
  resourceAccessor: 'resourceId',

  resourceIdAccessor: 'id',
  resourceTitleAccessor: 'title',

  longPressThreshold: 250,
  getNow: function getNow() {
    return new Date()
  },
}

var _initialiseProps = function _initialiseProps() {
  var _this2 = this

  this.getViews = function() {
    var views = _this2.props.views

    if (Array.isArray(views)) {
      return (0, _transform2.default)(
        views,
        function(obj, name) {
          return (obj[name] = _Views2.default[name])
        },
        {}
      )
    }

    if (
      (typeof views === 'undefined' ? 'undefined' : _typeof(views)) === 'object'
    ) {
      return (0, _mapValues2.default)(views, function(value, key) {
        if (value === true) {
          return _Views2.default[key]
        }

        return value
      })
    }

    return _Views2.default
  }

  this.getView = function() {
    var views = _this2.getViews()

    return views[_this2.props.view]
  }

  this.getDrilldownView = function(date) {
    var _props2 = _this2.props,
      view = _props2.view,
      drilldownView = _props2.drilldownView,
      getDrilldownView = _props2.getDrilldownView

    if (!getDrilldownView) return drilldownView

    return getDrilldownView(date, view, Object.keys(_this2.getViews()))
  }

  this.handleNavigate = function(action, newDate) {
    var _props3 = _this2.props,
      view = _props3.view,
      date = _props3.date,
      getNow = _props3.getNow,
      onNavigate = _props3.onNavigate,
      props = _objectWithoutProperties(_props3, [
        'view',
        'date',
        'getNow',
        'onNavigate',
      ])

    var ViewComponent = _this2.getView()

    date = (0, _move2.default)(
      ViewComponent,
      _extends({}, props, {
        action: action,
        date: newDate || date,
        today: getNow(),
      })
    )

    onNavigate(date, view, action)
  }

  this.handleViewChange = function(view) {
    if (view !== _this2.props.view && isValidView(view, _this2.props)) {
      _this2.props.onView(view)
    }
  }

  this.handleSelectEvent = function() {
    for (
      var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2] = arguments[_key2]
    }

    ;(0, _helpers.notify)(_this2.props.onSelectEvent, args)
  }

  this.handleDoubleClickEvent = function() {
    for (
      var _len3 = arguments.length, args = Array(_len3), _key3 = 0;
      _key3 < _len3;
      _key3++
    ) {
      args[_key3] = arguments[_key3]
    }

    ;(0, _helpers.notify)(_this2.props.onDoubleClickEvent, args)
  }

  this.handleSelectSlot = function(slotInfo) {
    ;(0, _helpers.notify)(_this2.props.onSelectSlot, slotInfo)
  }

  this.handleDrillDown = function(date, view) {
    var onDrillDown = _this2.props.onDrillDown

    if (onDrillDown) {
      onDrillDown(date, view, _this2.drilldownView)
      return
    }
    if (view) _this2.handleViewChange(view)

    _this2.handleNavigate(_constants.navigate.DATE, date)
  }
}

exports.default = (0, _uncontrollable2.default)(Calendar, {
  view: 'onView',
  date: 'onNavigate',
  selected: 'onSelectEvent',
})
module.exports = exports['default']
