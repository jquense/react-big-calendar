import Calendar from './Calendar';
import { set as setLocalizer } from './localizer';
import momentLocalizer from './moment-localizer';
import globalizeLocalizer from './globalize-localizer';

Object.assign(Calendar, {
  setLocalizer,
  globalizeLocalizer,
  momentLocalizer
})

export default Calendar
