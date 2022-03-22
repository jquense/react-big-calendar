import { action } from '@storybook/addon-actions'

import moment from 'moment'
import 'moment-timezone'
import React from 'react'

import { Calendar as BaseCalendar, momentLocalizer } from '../../src'

// For Testing SASS styling
import '../../src/sass/styles.scss'
import '../../src/addons/dragAndDrop/styles.scss'

import withDragAndDrop from '../../src/addons/dragAndDrop'

export { Views } from '../../src'

// uncomment for timezone testing in Storybook
//moment.tz.setDefault('America/Los_Angeles')

const localizer = momentLocalizer(moment)

export const date = (...args) => moment(...args).toDate()

export const Calendar = (props) => (
  <BaseCalendar localizer={localizer} {...props} />
)

export const DragAndDropCalendar = withDragAndDrop(Calendar)

export const DragableCalendar = (props) => {
  return (
    <DragAndDropCalendar
      popup
      selectable
      localizer={localizer}
      onEventDrop={action('event dropped')}
      onSelectEvent={action('event selected')}
      onSelectSlot={action('slot selected')}
      {...props}
    />
  )
}

export const events = [
  {
    title: 'test',
    start: moment().add(1, 'days').subtract(5, 'hours').toDate(),
    end: moment().add(1, 'days').subtract(4, 'hours').toDate(),
    allDay: false,
  },
  {
    title: 'test larger',
    start: moment().startOf('day').add(5, 'hours').toDate(),
    end: moment().startOf('day').add(10, 'hours').toDate(),
    allDay: false,
  },

  {
    title: 'test larger',
    start: moment().startOf('day').add(15, 'hours').toDate(),
    end: moment().startOf('day').add(23, 'hours').toDate(),
    allDay: false,
  },
  {
    title: 'test all day',
    start: moment().startOf('day').toDate(),
    end: moment().startOf('day').add(1, 'day').toDate(),
    allDay: true,
  },
  {
    title: 'test 2 days',
    start: moment().startOf('day').toDate(),
    end: moment().startOf('day').add(2, 'days').toDate(),
    allDay: true,
  },
  {
    title: 'test multi-day',
    start: moment().toDate(),
    end: moment().add(3, 'days').toDate(),
    allDay: false,
  },
]

export const backgroundEvents = [
  {
    title: 'test background event',
    start: moment().startOf('day').add(2, 'hours').toDate(),
    end: moment().startOf('day').add(12, 'hours').toDate(),
    allDay: false,
  },
]
