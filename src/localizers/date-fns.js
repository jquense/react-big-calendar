import dates from '../utils/dates'
import { set } from '../formats'
import { set as setLocalizer } from '../localizer'

let dateRangeFormat = ({ start, end }, culture, local) => {
  return (
    local.format(start, 'L', culture) + ' — ' + local.format(end, 'L', culture)
  )
}

let timeRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'LT', culture) + ' — ' + local.format(end, 'LT', culture)

let timeRangeStartFormat = ({ start, end }, culture, local) =>
  local.format(start, 'h:mma', culture) + ' — '

let timeRangeEndFormat = ({ start, end }, culture, local) =>
  ' — ' + local.format(end, 'h:mma', culture)

let weekRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'MMMM DD', culture) +
  ' - ' +
  local.format(end, dates.eq(start, end, 'month') ? 'DD' : 'MMMM DD', culture)

export let formats = {
  dateFormat: 'DD',
  dayFormat: 'DD ddd',
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
  agendaTimeRangeFormat: timeRangeFormat,
}

export default function({
  startOfWeek,
  getDay,
  parse,
  format: _format,
  locales,
}) {
  set(formats)

  return setLocalizer({
    firstOfWeek(culture) {
      return getDay(startOfWeek(new Date(), { locale: locales[culture] }))
    },

    parse(value, format, culture) {
      return parse(value, { locale: locales[culture] })
    },

    format(value, formatString, culture) {
      return _format(new Date(value), formatString, {
        locale: locales[culture],
      })
    },
  })
}
