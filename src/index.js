import Calendar from './Calendar';
import { set as setLocalizer } from './localizer';
import momentLocalizer from './moment-localizer';
import globalizeLocalizer from './globalize-localizer';
import viewLabel from './utils/viewLabel';
import move from './utils/move';

Object.assign(Calendar, {
  setLocalizer,
  globalizeLocalizer,
  momentLocalizer,
  label: viewLabel,
  move
})

export default Calendar
