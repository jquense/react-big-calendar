import dates from '../utils/dates';
import oldGlobalize from './oldGlobalize';
import warning from 'warning';
import { set } from '../formats';
import { set as setLocalizer } from '../localizer';

let dateRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, { date: 'short' }, culture) + ' — ' + local.format(end, { date: 'short' }, culture)

let timeRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, { time: 'short' }, culture) +
    ' — ' + local.format(end, { time: 'short' }, culture)

let timeRangeStartFormat = ({ start, end }, culture, local)=>
local.format(start, { time: 'short' }, culture) + ' — '

let timeRangeEndFormat = ({ start, end }, culture, local)=>
' — ' + local.format(end, { time: 'short' }, culture)

let weekRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'MMM dd', culture) +
    ' — ' + local.format(end, dates.eq(start, end, 'month') ? 'dd' : 'MMM dd', culture)

export let formats = {
  dateFormat: 'dd',
  dayFormat: 'eee dd/MM',
  weekdayFormat: 'eee',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

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

  // return the first day of the week from the locale data. Defaults to 'world'
  // territory if no territory is derivable from CLDR.
  // Failing to use CLDR supplemental (not loaded?), revert to the original
  // method of getting first day of week.
  function firstOfWeek(culture) {
    try {
        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const cldr = locale(culture).cldr;
        const territory = cldr.attributes.territory;
        const weekData = cldr.get('supplemental').weekData;
        const firstDay = weekData.firstDay[territory || '001'];
        return days.indexOf(firstDay);
    } catch (e) {
        warning(true,
            `Failed to accurately determine first day of the week.
            Is supplemental data loaded into CLDR?`);
        // maybe cldr supplemental is not loaded? revert to original method
        const date = new Date();
        //cldr-data doesn't seem to be zero based
        let localeDay = Math.max(
          parseInt(locale(culture).formatDate(date, { raw: 'e' }), 10) - 1, 0)

        return Math.abs(date.getDay() - localeDay)
    }
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
