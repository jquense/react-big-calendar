import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import SelectableBackgroundCells from '../../containers/SelectableBackgroundCells.jsx';
import moment from 'moment'

storiesOf('components.BackgroundCells', module)
  .add('week view', () => {
    const val = (slot) => {
      const days = [
        moment('1', 'E').toDate(),
        moment('2', 'E').toDate(),
        moment('3', 'E').toDate(),
        moment('4', 'E').toDate(),
        moment('5', 'E').toDate(),
        moment('6', 'E').toDate(),
        moment('7', 'E').toDate()
      ]
      return days[slot]
    }
    return <div className="rbc-allday-cell">
        <SelectableBackgroundCells selectable constantSelect slots={7} getValueFromSlot={val}
                                   onSelectSlot={action('selectslot')} />
      </div>
  })

  .add('month view', () => {
    const val = (slot) => {
      const days = [
        moment('1', 'E').toDate(),
        moment('2', 'E').toDate(),
        moment('3', 'E').toDate(),
        moment('4', 'E').toDate(),
        moment('5', 'E').toDate(),
        moment('6', 'E').toDate(),
        moment('7', 'E').toDate()
      ]
      return days[slot]
    }
    return (
      <div style={{height: 300}}>
        <div className="rbc-month-row">
          <SelectableBackgroundCells selectable constantSelect slots={7} getValueFromSlot={val}
                                     onSelectSlot={action('selectslot')} />
        </div>
      </div>
    )
  })
