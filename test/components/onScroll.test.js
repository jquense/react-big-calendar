import { render, fireEvent } from '@testing-library/react'
import Calendar from '../../src/Calendar'
import { localizer } from './fixtures'
import { views } from '../../src/utils/constants'

const defaultDate = new Date(2023, 0, 15)

const renderWeek = (props) =>
  render(
    <Calendar
      localizer={localizer}
      defaultDate={defaultDate}
      defaultView={views.WEEK}
      events={[]}
      {...props}
    />
  )

describe('onScroll', () => {
  test('fires with the time of day at the top of the scroll pane', () => {
    const onScroll = jest.fn()
    const { container } = renderWeek({ onScroll })

    const content = container.querySelector('.rbc-time-content')
    Object.defineProperty(content, 'scrollHeight', {
      value: 1000,
      configurable: true,
    })
    Object.defineProperty(content, 'scrollTop', {
      value: 250,
      configurable: true,
    })
    fireEvent.scroll(content)

    expect(onScroll).toHaveBeenCalledTimes(1)
    const scrollTime = onScroll.mock.calls[0][0]
    expect(scrollTime).toBeInstanceOf(Date)
    expect(scrollTime.getHours()).toBe(6)
    expect(scrollTime.getMinutes()).toBe(0)
  })

  test('does not fire without a measurable scroll pane', () => {
    const onScroll = jest.fn()
    const { container } = renderWeek({ onScroll })

    fireEvent.scroll(container.querySelector('.rbc-time-content'))

    expect(onScroll).not.toHaveBeenCalled()
  })
})
