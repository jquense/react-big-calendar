import { views } from './utils/constants'
import { GroupingCalendarMonthView } from './GroupingCalendarMonthView'
import { GroupingCalendarWeekView } from './GroupingCalendarWeekView'
import { GroupingCalendarDayView } from './GroupingCalendarDayView'

const GROUPING_CALENDAR_VIEWS = {
  [views.MONTH]: GroupingCalendarMonthView,
  [views.WEEK]: GroupingCalendarWeekView,
  [views.WORK_WEEK]: GroupingCalendarWeekView,
  [views.DAY]: GroupingCalendarDayView,
  [views.AGENDA]: GroupingCalendarWeekView,
}

export default GROUPING_CALENDAR_VIEWS
