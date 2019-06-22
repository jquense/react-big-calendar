/* eslint-disable react/prop-types */
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {
  TodayButton,
  PreviousButton,
  NextButton,
} from '../../src/NavigationButtons'

import NavigationButton from '../../src/NavigationButton'

import { momentLocalizer, Calendar, components as _components } from '../../src'
import moment from 'moment'

const localizer = momentLocalizer(moment)

Enzyme.configure({ adapter: new Adapter() })

const TestButton = ({ onClick, text = '' }) => (
  <NavigationButton message={text} onClick={onClick} />
)

const TestCalendar = props => {
  return (
    <Calendar
      {...props}
      events={[
        {
          start: new Date(),
          end: new Date(moment().add(1, 'hours')),
        },
      ]}
      localizer={localizer}
    />
  )
}

describe('when not passed any elements', () => {
  it('should render default buttons', () => {
    const cal = Enzyme.mount(<TestCalendar />)
    expect(cal.find(NextButton).length).toEqual(1)
    expect(cal.find(PreviousButton).length).toEqual(1)
    expect(cal.find(TodayButton).length).toEqual(1)
  })
})

describe('when passed a custom element in components', () => {
  const components = {
    ..._components,
    nextButton: TestButton,
    previousButton: TestButton,
  }
  const cal = Enzyme.mount(<TestCalendar components={components} />)
  it('should override the element', () => {
    expect(cal.find(TestButton).length).toEqual(2)
  })
  it('should remove overidden elements', () => {
    expect(cal.find(PreviousButton).length).toEqual(0)
  })
  it('should remove all elements', () => {
    expect(cal.find(NextButton).length).toEqual(0)
  })
})

describe('when given extra buttons', () => {
  const components = {
    ..._components,
    extraButtons: [
      { component: TestButton, key: 'test', onClick: () => {}, name: 'test' },
    ],
  }
  const cal = Enzyme.mount(<TestCalendar components={components} />)
  it('should render the extra buttons', () => {
    expect(cal.find(TestButton).length).toEqual(1)
  })
  it('should also render the default buttons', () => {
    expect(cal.find(NextButton).length).toEqual(1)
    expect(cal.find(PreviousButton).length).toEqual(1)
    expect(cal.find(TodayButton).length).toEqual(1)
  })
})
