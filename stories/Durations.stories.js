import React from 'react'
import {
  Calendar,
  Views,
  momentLocalizer,
  globalizeLocalizer,
  luxonLocalizer,
  dayjsLocalizer,
} from 'react-big-calendar'
import withDragAndDrop from '../src/addons/dragAndDrop'

import moment from 'moment'
import 'moment-timezone/builds/moment-timezone-with-data-1970-2030'
import dayjs from 'dayjs'
import globalize from 'globalize'
import { DateTime } from 'luxon'

const localizers = {
  globalize: globalizeLocalizer(globalize),
  moment: momentLocalizer(moment),
  luxon: luxonLocalizer(DateTime, { firstDayOfWeek: 7 }),
  dayjs: dayjsLocalizer(dayjs),
}

const DraggableCalendar = withDragAndDrop(Calendar)

export default {
  title: 'Additional Examples/Event Durations',
  component: Calendar,
  decorators: [
    (Story) => (
      <div className="height600">
        <Story />
      </div>
    ),
  ],
}

const Template = ({ localizer: loc = 'moment', ...args }) => {
  const localizer = localizers[loc]
  return <DraggableCalendar localizer={localizer} {...args} />
}

export const DaylightSavingsStarts = Template.bind({})
DaylightSavingsStarts.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon'],
    control: {
      type: 'select',
    },
  },
}
DaylightSavingsStarts.args = {
  defaultView: Views.DAY,
  localizer: 'moment',
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'on DST',
      start: new Date(2022, 2, 13, 1),
      end: new Date(2022, 2, 13, 2, 30),
      allDay: false,
    },
    {
      title: 'crosses DST',
      start: new Date(2022, 2, 13, 1),
      end: new Date(2022, 2, 13, 6, 30),
      allDay: false,
    },
    {
      title: 'After DST',
      start: new Date(2022, 2, 13, 7),
      end: new Date(2022, 2, 13, 9, 30),
      allDay: false,
    },
  ],
  defaultDate: new Date(2022, 2, 13),
}

export const DaylightSavingsStartsAfter2Am = Template.bind({})
DaylightSavingsStartsAfter2Am.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon'],
    control: {
      type: 'select',
    },
  },
}
DaylightSavingsStartsAfter2Am.args = {
  defaultView: Views.DAY,
  localizer: 'moment',
  min: moment('3:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'on DST',
      start: new Date(2022, 2, 13, 1),
      end: new Date(2022, 2, 13, 2, 30),
      allDay: false,
    },
    {
      title: 'crosses DST',
      start: new Date(2022, 2, 13, 1),
      end: new Date(2022, 2, 13, 6, 30),
      allDay: false,
    },
    {
      title: 'After DST',
      start: new Date(2022, 2, 13, 7),
      end: new Date(2022, 2, 13, 9, 30),
      allDay: false,
    },
  ],
  defaultDate: new Date(2022, 2, 13),
}

export const DaylightSavingsEnds = Template.bind({})
DaylightSavingsEnds.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon'],
    control: {
      type: 'select',
    },
  },
}
DaylightSavingsEnds.args = {
  defaultView: Views.DAY,
  localizer: 'moment',
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'on DST',
      start: new Date(2022, 10, 6, 1),
      end: new Date(2022, 10, 6, 3, 30),
      allDay: false,
    },
    {
      title: 'crosses DST',
      start: new Date(2022, 10, 6, 1),
      end: new Date(2022, 10, 6, 6, 30),
      allDay: false,
    },
    {
      title: 'After DST',
      start: new Date(2022, 10, 6, 7),
      end: new Date(2022, 10, 6, 7, 45),
      allDay: false,
    },
  ],
  defaultDate: new Date(2022, 10, 6),
}

export const DaylightSavingsEndsAfter2Am = Template.bind({})
DaylightSavingsEndsAfter2Am.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon'],
    control: {
      type: 'select',
    },
  },
}
DaylightSavingsEndsAfter2Am.args = {
  defaultView: Views.DAY,
  localizer: 'moment',
  min: moment('3:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'After DST',
      start: new Date(2022, 10, 6, 7),
      end: new Date(2022, 10, 6, 9, 30),
      allDay: false,
    },
  ],
  defaultDate: new Date(2022, 10, 6),
}

export const EventsEndingAtMidnight = Template.bind({})
EventsEndingAtMidnight.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon'],
    control: {
      type: 'select',
    },
  },
}

EventsEndingAtMidnight.args = {
  showMultiDayTimes: true,
  defaultView: Views.WEEK,
  localizer: 'moment',
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'week view issue',
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(
        new Date(
          new Date(
            new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0)
          ).setMinutes(0)
        ).setSeconds(0)
      ),
    },
  ],
}

export const EventsEndingPastMidnightMoment = Template.bind({})
EventsEndingPastMidnightMoment.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon'],
    control: {
      type: 'select',
    },
  },
}

EventsEndingPastMidnightMoment.args = {
  showMultiDayTimes: true,
  defaultView: Views.WEEK,
  localizer: 'moment',
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'week view issue',
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(
        new Date(
          new Date(
            new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0)
          ).setMinutes(5)
        ).setSeconds(0)
      ),
    },
  ],
}

export const EventsEndingBeforeMidnightMoment = Template.bind({})
EventsEndingBeforeMidnightMoment.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon'],
    control: {
      type: 'select',
    },
  },
}

EventsEndingBeforeMidnightMoment.args = {
  showMultiDayTimes: true,
  defaultView: Views.WEEK,
  localizer: 'moment',
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'week view issue',
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(
        new Date(
          new Date(
            new Date(new Date().setDate(new Date().getDate())).setHours(23)
          ).setMinutes(59)
        ).setSeconds(0)
      ),
    },
  ],
}

export const EventsEndingAtMidnightLuxon = Template.bind({})
EventsEndingAtMidnightLuxon.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon'],
    control: {
      type: 'select',
    },
  },
}

EventsEndingAtMidnightLuxon.args = {
  showMultiDayTimes: true,
  defaultView: Views.WEEK,
  localizer: 'luxon',
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'week view issue',
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(
        new Date(
          new Date(
            new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0)
          ).setMinutes(0)
        ).setSeconds(0)
      ),
    },
  ],
}

export const EventsEndingPastMidnightLuxon = Template.bind({})
EventsEndingPastMidnightLuxon.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon', 'dayjs'],
    control: {
      type: 'select',
    },
  },
}

EventsEndingPastMidnightLuxon.args = {
  showMultiDayTimes: true,
  defaultView: Views.WEEK,
  localizer: 'luxon',
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'week view issue',
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(
        new Date(
          new Date(
            new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0)
          ).setMinutes(5)
        ).setSeconds(0)
      ),
    },
  ],
}

export const EventsEndingAtMidnightDayJs = Template.bind({})
EventsEndingAtMidnightDayJs.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon', 'dayjs'],
    control: {
      type: 'select',
    },
  },
}

EventsEndingAtMidnightDayJs.args = {
  showMultiDayTimes: true,
  defaultView: Views.WEEK,
  localizer: 'dayjs',
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'week view issue',
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(
        new Date(
          new Date(
            new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0)
          ).setMinutes(0)
        ).setSeconds(0)
      ),
    },
  ],
}

export const EventsEndingPastMidnightDayJs = Template.bind({})
EventsEndingAtMidnightDayJs.argTypes = {
  localizer: {
    options: ['globalize', 'moment', 'luxon', 'dayjs'],
    control: {
      type: 'select',
    },
  },
}

EventsEndingPastMidnightDayJs.args = {
  showMultiDayTimes: true,
  defaultView: Views.WEEK,
  localizer: 'dayjs',
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'week view issue',
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(
        new Date(
          new Date(
            new Date(
              new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0)
            ).setMinutes(5)
          ).setSeconds(0)
        ).setMilliseconds(0)
      ),
    },
  ],
}
