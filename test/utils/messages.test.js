import messages from '../../src/utils/messages'

describe('messages', () => {
  test('returns defaults when called with no argument', () => {
    const result = messages()
    expect(result.date).toBe('Date')
    expect(result.time).toBe('Time')
    expect(result.event).toBe('Event')
    expect(result.allDay).toBe('All Day')
    expect(result.week).toBe('Week')
    expect(result.work_week).toBe('Work Week')
    expect(result.day).toBe('Day')
    expect(result.month).toBe('Month')
    expect(result.previous).toBe('Back')
    expect(result.next).toBe('Next')
    expect(result.yesterday).toBe('Yesterday')
    expect(result.tomorrow).toBe('Tomorrow')
    expect(result.today).toBe('Today')
    expect(result.agenda).toBe('Agenda')
    expect(result.noEventsInRange).toBe('There are no events in this range.')
  })

  test('showMore returns a formatted string with total count', () => {
    const result = messages()
    expect(result.showMore(5)).toBe('+5 more')
  })

  test('overrides individual messages when provided', () => {
    const result = messages({ date: 'Fecha', next: 'Siguiente' })
    expect(result.date).toBe('Fecha')
    expect(result.next).toBe('Siguiente')
    expect(result.time).toBe('Time') // unchanged default
  })

  test('custom showMore function overrides the default', () => {
    const custom = (n) => `${n} events`
    const result = messages({ showMore: custom })
    expect(result.showMore(3)).toBe('3 events')
  })
})
