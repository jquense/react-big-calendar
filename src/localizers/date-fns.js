import * as dates from '../utils/dates'
import { DateLocalizer } from '../localizer'

let dateRangeFormat = ({ start, end }, culture, local) => {
  return (
    local.format(start, 'L', culture) + ' — ' + local.format(end, 'L', culture)
  )
}

let timeRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'LT', culture) + ' — ' + local.format(end, 'LT', culture)

let timeRangeStartFormat = ({ start }, culture, local) =>
  local.format(start, 'h:mma', culture) + ' — '

let timeRangeEndFormat = ({ end }, culture, local) =>
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

const dateFnsLocalizer = function({
  startOfWeek,
  getDay,
  format: _format,
  locales,
}) {
  return new DateLocalizer({
    formats,
    firstOfWeek(culture) {
      return getDay(startOfWeek(new Date(), { locale: locales[culture] }))
    },

    format(value, formatString, culture) {
      return _format(new Date(value), formatString, {
        locale: locales[culture],
      })
    },
  })
}

export default dateFnsLocalizer
