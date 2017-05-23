import dates from './dates';
import { accessor as get } from './accessors';

var idCount = 0;

function uniqueId (prefix) {
  return '' + ((prefix == null ? '' : prefix) + (++idCount));
}

export function notify(handler, args){
  handler && handler.apply(null, [].concat(args))
}

export function instanceId(component, suffix = ''){
  component.__id || (component.__id = uniqueId('rw_'))
  return (component.props.id || component.__id)  + suffix
}

export function isFirstFocusedRender(component){
  return component._firstFocus || (component.state.focused && (component._firstFocus = true))
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
export function isAllDayEvent(event, { startAccessor, endAccessor, allDayAccessor }) {
  const eStart = get(event, startAccessor);
  const eEnd = get(event, endAccessor);

  const endsDayAfter = dates.isDayAfter(eStart, eEnd);

  return get(event, allDayAccessor)
      || (!dates.eq(eStart, eEnd, 'day') && !(endsDayAfter && dates.timeDiffLTE(eStart, eEnd, 24, 'hours')))
      || (dates.isJustDate(eStart) && dates.isJustDate(eEnd) && !endsDayAfter);
}

/**
 * Returns a filter function that returns true if an event should be rendered
 * in the specified date's day column.
 */
export function makeEventFilter(date, { startAccessor, endAccessor }) {
  return function filterDayEvents(event) {
    const start = get(event, startAccessor);
    return dates.inRange(date,
      start,
      get(event, endAccessor), 'day'
    ) && dates.eq(date, start, 'day') // ignore back end of long range events for now
  }
}
