import Calendar from './Calendar'
import EventWrapper from './EventWrapper'
import BackgroundWrapper from './BackgroundWrapper'
import { set as setLocalizer } from './localizer'
import momentLocalizer from './localizers/moment'
import globalizeLocalizer from './localizers/globalize'
import dateFnsLocalizer from './localizers/date-fns'
import move from './utils/move'
import { views, navigate } from './utils/constants'

Object.assign(Calendar, {
  setLocalizer,
  globalizeLocalizer,
  momentLocalizer,
  dateFnsLocalizer,
  Views: views,
  Navigate: navigate,
  move,
  components: {
    eventWrapper: EventWrapper,
    dayWrapper: BackgroundWrapper,
    dateCellWrapper: BackgroundWrapper,
  },
})

export default Calendar
