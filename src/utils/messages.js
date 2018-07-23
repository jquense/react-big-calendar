import invariant from 'invariant'

let defaultMessages = {
  date: 'Date',
  time: 'Time',
  event: 'Event',
  allDay: 'All Day',
  week: 'Week',
  work_week: 'Work Week',
  day: 'Day',
  month: 'Month',
  previous: 'Back',
  next: 'Next',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  today: 'Today',
  agenda: 'Agenda',

  showMore: total => `+${total} more`,
}

export function set(key, msg) {
  invariant(
    messages.hasOwnProperty(key),
    `The message key: "${key}" is not a valid message name. ` +
      `valid keys are: ${Object.keys(messages).join(', ')}`
  )

  messages[key] = msg
}

export function result(msg, ...args) {
  return typeof msg === 'function' ? msg(args) : msg
}

export default function messages(msgs) {
  return {
    ...defaultMessages,
    ...msgs,
  }
}
