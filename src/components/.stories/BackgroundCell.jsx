import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import BackgroundCell from '../BackgroundCell.jsx';

storiesOf('components.BackgroundCell', module)
  .add('default view', () => {
    return (
      <div className='rbc-row-bg'>
        <BackgroundCell index={0} slots={3} />
        <BackgroundCell index={1} slots={3} />
        <BackgroundCell index={2} slots={3} />
      </div>
    )
  })

  .add('selected', () => {
    return (
      <div className='rbc-row-bg'>
        <BackgroundCell index={0} slots={3} selected />
        <BackgroundCell index={1} slots={3} />
        <BackgroundCell index={2} slots={3} />
      </div>
    )
  })
