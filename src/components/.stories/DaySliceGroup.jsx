import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DaySliceGroup from '../DaySliceGroup.jsx';
import Selection from '../../containers/Selection.jsx'
import '../../less/styles.less'

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
          <DaySliceGroup time={() => '1:00pm'} />
          <DaySliceGroup time={() => '1:20pm'} />
          <DaySliceGroup time={() => '1:40pm'} />
        </Wrapper>
      </div>
    )
  })

  .add('3 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <Wrapper selectable constantSelect>
          <DaySliceGroup slices={3} time={() => '1:00pm'} />
          <DaySliceGroup slices={3} time={() => '1:20pm'} />
          <DaySliceGroup slices={3} time={() => '1:40pm'} />
        </Wrapper>
      </div>
    )
  })

  .add('4 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <Wrapper selectable constantSelect>
          <DaySliceGroup slices={4} time={() => '1:00pm'} />
          <DaySliceGroup slices={4} time={() => '1:20pm'} />
          <DaySliceGroup slices={4} time={() => '1:40pm'} />
        </Wrapper>
      </div>
    )
  })

  .add('5 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <Wrapper selectable constantSelect>
          <DaySliceGroup slices={5} time={() => '1:00pm'} />
          <DaySliceGroup slices={5} time={() => '1:20pm'} />
          <DaySliceGroup slices={5} time={() => '1:40pm'} />
        </Wrapper>
      </div>
    )
  })
