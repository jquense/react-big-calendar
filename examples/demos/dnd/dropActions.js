import moment from 'moment'

export function updateEventTime (event, newDate) {
  const { start, end } = event
  const { value, type } = newDate
  const startDate = moment(start)
  const endDate = moment(end)
  const backgroundCell = moment(value)
  // Calculate duration between original start and end dates
  const duration = moment.duration({'milliseconds': endDate.diff(startDate)})

  // If the event is dropped in a "Day" cell, preserve an event's start time by extracting the hours and minutes off
  // the original start date and add it to newDate.value

  const newStartDate = type === 'Day'
  ? backgroundCell.add(startDate.hours(), 'h').add(startDate.minutes(), 'm')
  : backgroundCell

  const newEndDate = moment(newStartDate).add(duration)

  return {
    ...event,
    start: newStartDate.toDate(),
    end: newEndDate.toDate()
  }
}
