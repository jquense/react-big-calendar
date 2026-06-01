import moment from 'moment'
import momentLocalizer from '../../src/localizers/moment'
import messages from '../../src/utils/messages'

export const localizer = momentLocalizer(moment)

export const msgsObj = messages({})

export const mergedLocalizer = {
  ...localizer,
  messages: msgsObj,
  startOfWeek: () => localizer.startOfWeek(),
  format: (value, fmt) => localizer.format(value, fmt),
}

export const accessors = {
  title: (e) => e.title,
  tooltip: (e) => e.tooltip || e.title,
  allDay: (e) => e.allDay || false,
  start: (e) => e.start,
  end: (e) => e.end,
  resource: (e) => e.resourceId,
  resourceId: (r) => r.id,
}

export const getters = {
  eventProp: () => ({ style: {}, className: '' }),
  slotProp: () => ({ style: {}, className: '' }),
  slotGroupProp: () => ({}),
  dayProp: () => ({}),
}

export const NoopEventWrapper = ({ children }) => children

export const components = {
  event: null,
  eventWrapper: NoopEventWrapper,
  eventContainerWrapper: NoopEventWrapper,
  dayWrapper: null,
  dateCellWrapper: null,
  timeSlotWrapper: null,
  timeGutterHeader: null,
  resourceHeader: null,
  toolbar: null,
  agenda: {
    date: null,
    time: null,
    event: null,
  },
  day: { header: null, event: null },
  week: { header: null, event: null },
  month: { header: null, event: null, dateHeader: null },
}

export const makeEvent = (overrides = {}) => ({
  id: 1,
  title: 'Test Event',
  start: new Date(2023, 0, 15, 10, 0),
  end: new Date(2023, 0, 15, 11, 0),
  allDay: false,
  ...overrides,
})
