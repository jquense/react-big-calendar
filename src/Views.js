import { views } from './utils/constants'
import Month from './Month'
import WorkMonth from './WorkMonth'
import Day from './Day'
import Week from './Week'
import WorkWeek from './WorkWeek'
import Agenda from './Agenda'

const VIEWS = {
  [views.MONTH]: Month,
  [views.WORK_MONTH]: WorkMonth,
  [views.WEEK]: Week,
  [views.WORK_WEEK]: WorkWeek,
  [views.DAY]: Day,
  [views.AGENDA]: Agenda,
}

export default VIEWS
