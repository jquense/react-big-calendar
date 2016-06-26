import Calendar from './Calendar';
import EventWrapper from './EventWrapper';
import { set as setLocalizer } from './localizer';
import momentLocalizer from './localizers/moment';
import globalizeLocalizer from './localizers/globalize';
import viewLabel from './utils/viewLabel';
import move from './utils/move';
import { views } from './utils/constants';

Object.assign(Calendar, {
  setLocalizer,
  globalizeLocalizer,
  momentLocalizer,
  label: viewLabel,
  views,
  move,
  components: {
    eventWrapper: EventWrapper
  }
})

export default Calendar
