import dates from '../utils/dates';
import oldGlobalize from './oldGlobalize';
import { set } from '../formats';
import { set as setLocalizer } from '../localizer';

let dateRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, { date: 'short' }, culture) + ' — ' + local.format(end, { date: 'short' }, culture)

let timeRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, { time: 'short' }, culture) +
    ' — ' + local.format(end, { time: 'short' }, culture)

let weekRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'MMM dd', culture) +
    ' — ' + local.format(end, dates.eq(start, end, 'month') ? 'dd' : 'MMM dd', culture)

export let formats = {
  dateFormat: 'dd',
  dayFormat: 'eee dd/MM',
  weekdayFormat: 'eee',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,

  timeGutterFormat: { time: 'short' },

  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'eeee MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'eee MMM dd',
  agendaTimeFormat: { time: 'short' },
  agendaTimeRangeFormat: timeRangeFormat
}

export default function(globalize) {
  let locale = culture => culture ? globalize(culture) : globalize;

  function firstOfWeek(culture) {
    let date = new Date();
    //cldr-data doesn't seem to be zero based
    let localeDay = Math.max(
      parseInt(locale(culture).formatDate(date, { raw: 'e' }), 10) - 1, 0)

    return Math.abs(date.getDay() - localeDay)
  }

  if (!globalize.load)
    return oldGlobalize(globalize);


  set(formats)

  return setLocalizer({
    firstOfWeek,

    parse(value, format, culture){
      format = typeof format === 'string' ? { raw: format } : format;
      return locale(culture).parseDate(value, format)
    },

    format(value, format, culture){
      format = typeof format === 'string' ? { raw: format } : format;
      return locale(culture).formatDate(value, format)
    }
  })
}
