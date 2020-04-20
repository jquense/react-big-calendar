import { views } from './utils/constants'
import Month from './Month'
import Day from './Day'
import Week from './Week'
import WorkWeek from './WorkWeek'
import Agenda from './Agenda'
import Scheduler from './scheduler/Scheduler'

const VIEWS = {
  [views.MONTH]: Month,
  [views.WEEK]: Week,
  [views.WORK_WEEK]: WorkWeek,
  [views.SCHEDULER]: Scheduler,
  [views.DAY]: Day,
  [views.AGENDA]: Agenda,
}

export default VIEWS
