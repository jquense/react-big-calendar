import React from 'react'
import { render } from '@testing-library/react'
import NoopWrapper from '../../src/NoopWrapper'
import BackgroundWrapper from '../../src/BackgroundWrapper'
import EventWrapper from '../../src/EventWrapper'
import DayColumnWrapper from '../../src/DayColumnWrapper'
import ScrollableWeekWrapper from '../../src/ScrollableWeekWrapper'

describe('NoopWrapper', () => {
  test('renders its children', () => {
    const { getByText } = render(
      <NoopWrapper>
        <span>child</span>
      </NoopWrapper>
    )
    expect(getByText('child')).toBeInTheDocument()
  })
})

describe('BackgroundWrapper', () => {
  test('is the same as NoopWrapper', () => {
    expect(BackgroundWrapper).toBe(NoopWrapper)
  })

  test('renders children', () => {
    const { getByText } = render(
      <BackgroundWrapper>
        <span>bg</span>
      </BackgroundWrapper>
    )
    expect(getByText('bg')).toBeInTheDocument()
  })
})

describe('EventWrapper', () => {
  test('is the same as NoopWrapper', () => {
    expect(EventWrapper).toBe(NoopWrapper)
  })

  test('renders children', () => {
    const { getByText } = render(
      <EventWrapper>
        <span>event</span>
      </EventWrapper>
    )
    expect(getByText('event')).toBeInTheDocument()
  })
})

describe('DayColumnWrapper', () => {
  test('renders a div with children', () => {
    const { getByText } = render(
      <DayColumnWrapper className="test-class" style={{ color: 'red' }}>
        <span>day column</span>
      </DayColumnWrapper>
    )
    expect(getByText('day column')).toBeInTheDocument()
  })

  test('applies className and style to the wrapping div', () => {
    const { container } = render(
      <DayColumnWrapper className="my-class" style={{ width: '100px' }}>
        <span>child</span>
      </DayColumnWrapper>
    )
    const div = container.firstChild
    expect(div.className).toBe('my-class')
    expect(div.style.width).toBe('100px')
  })
})

describe('ScrollableWeekWrapper', () => {
  test('renders children inside rbc-row-content-scroll-container', () => {
    const { container, getByText } = render(
      <ScrollableWeekWrapper>
        <span>week</span>
      </ScrollableWeekWrapper>
    )
    expect(getByText('week')).toBeInTheDocument()
    expect(container.firstChild.className).toBe(
      'rbc-row-content-scroll-container'
    )
  })
})
