import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DaySliceGroup from '../DaySliceGroup.jsx';
import Selection from '../../containers/Selection.jsx'
import '../../less/styles.less'
import moment from 'moment'

function format(v) {
  return moment(v).format('h:mma')
}

class Test extends React.Component {
  render () {
    return <div>{this.props.children}</div>
  }
}

const Wrapper = Selection(Test)

storiesOf('components.DaySliceGroup', module)
  .add('default view', () => {
    return (
      <div className='rbc-time-gutter'>
        <Wrapper selectable constantSelect>
          <DaySliceGroup time={format} size={20} value={moment('1:00pm', 'h:mma').toDate()} />
          <DaySliceGroup time={format} size={20} value={moment('1:20pm', 'h:mma').toDate()} />
          <DaySliceGroup time={format} size={20} value={moment('1:40pm', 'h:mma').toDate()} />
        </Wrapper>
      </div>
    )
  })

  .add('3 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <Wrapper selectable constantSelect>
          <DaySliceGroup slices={3} time={format} size={20} value={moment('1:00pm', 'h:mma').toDate()} />
          <DaySliceGroup slices={3} time={format} size={20} value={moment('1:20pm', 'h:mma').toDate()} />
          <DaySliceGroup slices={3} time={format} size={20} value={moment('1:40pm', 'h:mma').toDate()} />
        </Wrapper>
      </div>
    )
  })

  .add('4 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <Wrapper selectable constantSelect>
          <DaySliceGroup slices={4} time={format} size={20} value={moment('1:00pm', 'h:mma').toDate()} />
          <DaySliceGroup slices={4} time={format} size={20} value={moment('1:20pm', 'h:mma').toDate()} />
          <DaySliceGroup slices={4} time={format} size={20} value={moment('1:40pm', 'h:mma').toDate()} />
        </Wrapper>
      </div>
    )
  })

  .add('5 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <Wrapper selectable constantSelect>
          <DaySliceGroup slices={5} time={format} size={20} value={moment('1:00pm', 'h:mma').toDate()} />
          <DaySliceGroup slices={5} time={format} size={20} value={moment('1:20pm', 'h:mma').toDate()} />
          <DaySliceGroup slices={5} time={format} size={20} value={moment('1:40pm', 'h:mma').toDate()} />
        </Wrapper>
      </div>
    )
  })
