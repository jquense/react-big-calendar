'use strict';

exports.__esModule = true;
exports.notify = notify;
exports.instanceId = instanceId;
exports.isFirstFocusedRender = isFirstFocusedRender;
exports.isAllDayEvent = isAllDayEvent;
exports.makeEventFilter = makeEventFilter;

var _dates = require('./dates');

var _dates2 = _interopRequireDefault(_dates);

var _accessors = require('./accessors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idCount = 0;

function uniqueId(prefix) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount);
}

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}

function instanceId(component) {
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  component.__id || (component.__id = uniqueId('rw_'));
  return (component.props.id || component.__id) + suffix;
}

function isFirstFocusedRender(component) {
  return component._firstFocus || component.state.focused && (component._firstFocus = true);
}

/**
* Returns true if the given event is an all day event.
*
* Special note: the boolean `endsDayAfter` is used in the second condition to check for
* a 'long range event' (see definition below), and used in the third condition to allow
* for the rendering of 12AM - 12AM full day events. The usage in the third condition is
* ADMITTEDLY HACKY and should NOT be there, but this is what our users are used to
* seeing in the old scheduler, so we have to maintain the status quo.
*
* A long range event is defined as an event that starts on a given day and ends
* on the following day, but is LTE (less than or equal to) 24 hours long. These events
* should be displayed in the "range events" section of the calendar instead of the "all
* day events" section, despite spanning more than one day.
*/
function isAllDayEvent(event, _ref) {
  var startAccessor = _ref.startAccessor,
      endAccessor = _ref.endAccessor,
      allDayAccessor = _ref.allDayAccessor;

  var eStart = (0, _accessors.accessor)(event, startAccessor);
  var eEnd = (0, _accessors.accessor)(event, endAccessor);

  var endsDayAfter = _dates2.default.isDayAfter(eStart, eEnd);

  return (0, _accessors.accessor)(event, allDayAccessor) || !_dates2.default.eq(eStart, eEnd, 'day') && !(endsDayAfter && _dates2.default.timeDiffLTE(eStart, eEnd, 24, 'hours')) || _dates2.default.isJustDate(eStart) && _dates2.default.isJustDate(eEnd) && !endsDayAfter;
}

/**
 * Returns a filter function that returns true if an event should be rendered
 * in the specified date's day column.
 */
function makeEventFilter(date, _ref2) {
  var startAccessor = _ref2.startAccessor,
      endAccessor = _ref2.endAccessor;

  return function filterDayEvents(event) {
    var start = (0, _accessors.accessor)(event, startAccessor);
    return _dates2.default.inRange(date, start, (0, _accessors.accessor)(event, endAccessor), 'day') && _dates2.default.eq(date, start, 'day'); // ignore back end of long range events for now
  };
}