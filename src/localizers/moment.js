import dates from '../utils/dates';
import { set } from '../formats';
import { set as setLocalizer } from '../localizer';

function inSame12Hr(start, end){
  let s = 12 - dates.hours(start)
  let e = 12 - dates.hours(end)
  return (s <= 0 && e <= 0) || (s >= 0 && e >= 0)
}

let dateRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'L', culture) + ' — ' + local.format(end, 'L', culture)

let timeRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'h:mma', culture) +
    ' — ' + local.format(end, inSame12Hr(start, end) ? 'h:mm' : 'h:mma', culture)

let weekRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'MMM DD', culture) +
    ' - ' + local.format(end, dates.eq(start, end, 'month') ? 'DD' : 'MMM DD', culture)

export let formats = {
  dateFormat: 'DD',
  dayFormat: 'ddd DD/MM',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,

  timeGutterFormat: 'LT',

  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ddd MMM DD',
  agendaTimeFormat: 'LT',
  agendaTimeRangeFormat: timeRangeFormat
}

export default function (moment){
  let locale = (m, c) => c ? m.locale(c) : m;

  set(formats)

  return setLocalizer({

    firstOfWeek(culture) {
      let data = culture ? moment.localeData(culture) : moment.localeData();
      return data ? data.firstDayOfWeek() : 0
    },

    parse(value, format, culture) {
      return locale(moment(value, format), culture).toDate()
    },

    format(value, format, culture) {
      return locale(moment(value), culture).format(format)
    }
  })
}
