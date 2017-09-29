import dates from '../utils/dates';
import { set } from '../formats';
import { set as setLocalizer } from '../localizer';

let dateRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'L', culture) + ' — ' + local.format(end, 'L', culture)

let timeRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'LT', culture) + ' — ' + local.format(end, 'LT', culture)

let timeRangeStartFormat = ({ start, end }, culture, local)=>
  local.format(start, 'h:mma', culture) +' — '

let timeRangeEndFormat = ({ start, end }, culture, local)=>
  ' — ' + local.format(end, 'h:mma', culture)

let weekRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'MMM DD', culture) +
    ' - ' + local.format(end, dates.eq(start, end, 'month') ? 'DD' : 'MMM DD', culture)

export let formats = {
  dateFormat: 'DD',
  dayFormat: 'ddd DD/MM',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: 'LT',

  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM DD',
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
