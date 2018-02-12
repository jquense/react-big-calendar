import invariant from 'invariant'

let defaultMessages = {
  date: 'Date',
  time: 'Time',
  event: 'Event',
  allDay: 'all day',
  week: 'week',
  work_week: 'work week',
  day: 'day',
  month: 'month',
  previous: 'back',
  next: 'next',
  yesterday: 'yesterday',
  tomorrow: 'tomorrow',
  today: 'today',
  agenda: 'agenda',

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
