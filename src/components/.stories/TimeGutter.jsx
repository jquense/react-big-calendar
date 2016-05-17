import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TimeGutter from '../TimeGutter.jsx';
import '../../less/reset.less'
import '../../less/styles.less'

storiesOf('components.TimeGutter', module)
  .add('default view', () => {
    return (
      <TimeGutter />
    )
  })
