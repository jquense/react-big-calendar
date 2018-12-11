import Calendar from './Calendar'
import EventWrapper from './EventWrapper'
import BackgroundWrapper from './BackgroundWrapper'
import momentLocalizer from './localizers/moment'
import globalizeLocalizer from './localizers/globalize'
import move from './utils/move'
import { views, navigate } from './utils/constants'
import Layouts from './Layouts'

Object.assign(Calendar, {
  globalizeLocalizer,
  momentLocalizer,
  Views: views,
  Layouts,
  Navigate: navigate,
  move,
  components: {
    eventWrapper: EventWrapper,
    dayWrapper: BackgroundWrapper,
    dateCellWrapper: BackgroundWrapper,
  },
})

export default Calendar
