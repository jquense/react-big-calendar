import React from 'react'
import { render } from '@testing-library/react'

// These files have 0% coverage because they just export/create context/values.
// Importing them ensures module-level code runs.
import CalendarContext from '../../src/CalendarContext'
import SrcEventWrapper from '../../src/EventWrapper'
import SrcBackgroundWrapper from '../../src/BackgroundWrapper'
import NoopWrapper from '../../src/NoopWrapper'
import { views, navigate } from '../../src/utils/constants'

describe('CalendarContext', () => {
  test('is a React context object', () => {
    expect(CalendarContext).toBeDefined()
    expect(typeof CalendarContext.Provider).toBe('object')
    expect(typeof CalendarContext.Consumer).toBe('object')
  })

  test('can be used as a Provider and Consumer', () => {
    const value = { test: true }
    let consumed
    function TestConsumer() {
      return (
        <CalendarContext.Consumer>
          {(ctx) => {
            consumed = ctx
            return null
          }}
        </CalendarContext.Consumer>
      )
    }
    render(
      <CalendarContext.Provider value={value}>
        <TestConsumer />
      </CalendarContext.Provider>
    )
    expect(consumed).toEqual(value)
  })
})

describe('EventWrapper (src/EventWrapper.js)', () => {
  test('is the same as NoopWrapper', () => {
    expect(SrcEventWrapper).toBe(NoopWrapper)
  })

  test('renders children', () => {
    const { getByText } = render(
      <SrcEventWrapper>
        <span>event</span>
      </SrcEventWrapper>
    )
    expect(getByText('event')).toBeInTheDocument()
  })
})

describe('BackgroundWrapper (src/BackgroundWrapper.js)', () => {
  test('is the same as NoopWrapper', () => {
    expect(SrcBackgroundWrapper).toBe(NoopWrapper)
  })

  test('renders children', () => {
    const { getByText } = render(
      <SrcBackgroundWrapper>
        <span>bg</span>
      </SrcBackgroundWrapper>
    )
    expect(getByText('bg')).toBeInTheDocument()
  })
})

describe('constants', () => {
  test('views has all expected values', () => {
    expect(views.MONTH).toBe('month')
    expect(views.WEEK).toBe('week')
    expect(views.WORK_WEEK).toBe('work_week')
    expect(views.DAY).toBe('day')
    expect(views.AGENDA).toBe('agenda')
  })

  test('navigate has all expected values', () => {
    expect(navigate.PREVIOUS).toBe('PREV')
    expect(navigate.NEXT).toBe('NEXT')
    expect(navigate.TODAY).toBe('TODAY')
    expect(navigate.DATE).toBe('DATE')
  })
})
