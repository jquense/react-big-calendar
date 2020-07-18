import EventWrapper from './EventWrapper.js'
import BackgroundWrapper from './BackgroundWrapper.js'
export { default as Calendar } from './Calendar.js'
export { DateLocalizer } from './localizer.js'
export { default as momentLocalizer } from './localizers/moment.js'
export { default as globalizeLocalizer } from './localizers/globalize.js'
export { default as dateFnsLocalizer } from './localizers/date-fns.js'
export { default as move } from './utils/move.js'
export { navigate as Navigate, views as Views } from './utils/constants.js'

const components = {
  eventWrapper: EventWrapper,
  timeSlotWrapper: BackgroundWrapper,
  dateCellWrapper: BackgroundWrapper,
}

export { components }
