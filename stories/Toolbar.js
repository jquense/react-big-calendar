import React from 'react'
import { storiesOf, action } from '@storybook/react'

import demoEvents from '../examples/events'
import { Calendar } from './helpers'
import customComponents from './helpers/customComponents'
import { views } from '../src/utils/constants'

storiesOf('Toolbar', module)
  .add('split left buttons', () => (
    <Calendar
      popup
      toolbar={{
        left: 'today previous next',
      }}
      events={demoEvents}
      onSelectEvent={action('event selected')}
      defaultDate={new Date(2015, 3, 1)}
    />
  ))
  .add('split month but group other right buttons', () => (
    <Calendar
      popup
      toolbar={{
        right: 'month week,work_week,day,agenda',
      }}
      views={[
        views.AGENDA,
        views.DAY,
        views.MONTH,
        views.WEEK,
        views.WORK_WEEK,
      ]}
      events={demoEvents}
      onSelectEvent={action('event selected')}
      defaultDate={new Date(2015, 3, 1)}
    />
  ))
  .add('group week and workweek and day and agenda, hide month', () => (
    <Calendar
      popup
      toolbar={{
        right: 'week,work_week day,agenda',
      }}
      views={[
        views.AGENDA,
        views.DAY,
        views.MONTH,
        views.WEEK,
        views.WORK_WEEK,
      ]}
      defaultView={views.MONTH}
      events={demoEvents}
      onSelectEvent={action('event selected')}
      defaultDate={new Date(2015, 3, 1)}
    />
  ))
  .add('custom title component', () => (
    <Calendar
      toolbar={{
        center: 'title',
      }}
      components={{
        title: customComponents.customTitle,
      }}
      events={demoEvents}
      onSelectEvent={action('event selected')}
      defaultDate={new Date(2015, 3, 1)}
    />
  ))
