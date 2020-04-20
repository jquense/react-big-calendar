import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import moment from 'moment'
import React from 'react'

import '../src/sass/styles.scss'
import '../src/addons/dragAndDrop/styles.scss'

import { Views, Calendar } from './helpers'
import resources from './helpers/resourceEvents'

storiesOf('Scheduler', module)
  .add('No overlap', () => {
    return (
      <Calendar
        dayLayoutAlgorithm={'no-overlap'}
        views={['day', 'week', 'scheduler']}
        defaultView={Views.SCHEDULER}
        events={resources.events}
        resources={resources.list}
        onSelectEvent={action('event selected')}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  })
  .add('Overlap', () => {
    return (
      <Calendar
        views={['day', 'week', 'scheduler']}
        defaultView={Views.SCHEDULER}
        events={resources.events}
        resources={resources.list}
        onSelectEvent={action('event selected')}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  })
