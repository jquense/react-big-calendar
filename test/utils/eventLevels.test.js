import {
  endOfRange,
  eventSegments,
  eventLevels,
  inRange,
  segsOverlap,
  sortEvents,
} from '../../src/utils/eventLevels'

describe('endOfRange', () => {
  test('it adds one day by default', () => {
    const dateRange = [new Date(2017, 0, 1), new Date(2017, 0, 2)]

    const result = endOfRange(dateRange)

    expect(result.first).toEqual(dateRange[0])
    expect(result.last).toEqual(new Date(2017, 0, 3))
  })

  test('it respects unit value when passed', () => {
    const dateRange = [new Date(2017, 0, 1), new Date(2017, 0, 2)]

    const result = endOfRange(dateRange, 'week')

    expect(result.first).toEqual(dateRange[0])
    expect(result.last).toEqual(new Date(2017, 0, 9))
  })
})

describe('eventSegments', () => {
  const event = { start: new Date(2017, 0, 8), end: new Date(2017, 0, 11, 12) }
  const accessors = { start: e => e.start, end: e => e.end }

  test('it includes the original event in the returned object', () => {
    const range = [
      new Date(2017, 0, 8),
      new Date(2017, 0, 9),
      new Date(2017, 0, 10),
      new Date(2017, 0, 11),
    ]

    const result = eventSegments(event, range, accessors)

    expect(result.event).toEqual(event)
  })

  describe('when the event spans the full range', () => {
    const range = [
      new Date(2017, 0, 8),
      new Date(2017, 0, 9),
      new Date(2017, 0, 10),
      new Date(2017, 0, 11),
    ]

    test('it sets span equal to the number of days the event spans', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.span).toBe(4)
    })

    test('it sets left equal to one', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.left).toBe(1)
    })

    test('it sets right equal to the length of the range', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.right).toBe(4)
    })
  })

  describe('when the event starts before the range and ends at the end of the range', () => {
    const range = [
      new Date(2017, 0, 9),
      new Date(2017, 0, 10),
      new Date(2017, 0, 11),
    ]

    test('it sets span equal to the number of days the range spans', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.span).toBe(3)
    })

    test('it sets left equal to one', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.left).toBe(1)
    })

    test('it sets right equal to the length of the range', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.right).toBe(3)
    })
  })

  describe('when the event starts at the start of the range and ends after it', () => {
    const range = [
      new Date(2017, 0, 8),
      new Date(2017, 0, 9),
      new Date(2017, 0, 10),
    ]

    test('it sets span equal to the number of days the range spans', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.span).toBe(3)
    })

    test('it sets left equal to one', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.left).toBe(1)
    })

    test('it sets right equal to the length of the range', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.right).toBe(3)
    })
  })

  describe('when the event starts and ends within the range', () => {
    const range = [
      new Date(2017, 0, 7),
      new Date(2017, 0, 8),
      new Date(2017, 0, 9),
      new Date(2017, 0, 10),
      new Date(2017, 0, 11),
      new Date(2017, 0, 12),
    ]

    test('it sets span equal to the number of days the event spans', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.span).toBe(4)
    })

    test('it sets left equal to the 1-based index into the range where the event starts', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.left).toBe(2)
    })

    test('it sets right equal to the 1-based index into the range where the event ends', () => {
      const result = eventSegments(event, range, accessors)

      expect(result.right).toBe(5)
    })
  })
})

describe('eventLevels', () => {
  test('it sorts the segments within each level based on their left value', () => {
    const segments = [
      { left: 2, right: 2 },
      { left: 3, right: 3 },
      { left: 1, right: 1 },
      { left: 3, right: 3 },
      { left: 1, right: 1 },
    ]

    const result = eventLevels(segments)

    const expectedLevels = [
      [segments[2], segments[0], segments[1]],
      [segments[4], segments[3]],
    ]
    expect(result.levels).toEqual(expectedLevels)
    expect(result.extra).toEqual([])
  })

  test('it returns a single level if no events overlap', () => {
    const segments = [
      { left: 1, right: 1 },
      { left: 2, right: 2 },
      { left: 3, right: 3 },
    ]

    const result = eventLevels(segments)

    const expectedLevels = [[segments[0], segments[1], segments[2]]]
    expect(result.levels).toEqual(expectedLevels)
    expect(result.extra).toEqual([])
  })

  describe('with no specified limit', () => {
    test('it splits up the segments into however many levels are needed based on whether they overlap', () => {
      const segments = [
        { left: 1, right: 1 },
        { left: 1, right: 1 },
        { left: 1, right: 1 },
        { left: 2, right: 2 },
        { left: 2, right: 2 },
        { left: 2, right: 2 },
        { left: 3, right: 3 },
        { left: 3, right: 3 },
        { left: 3, right: 3 },
      ]

      const result = eventLevels(segments)

      const expectedLevels = [
        [segments[0], segments[3], segments[6]],
        [segments[1], segments[4], segments[7]],
        [segments[2], segments[5], segments[8]],
      ]
      expect(result.levels).toEqual(expectedLevels)
      expect(result.extra).toEqual([])
    })
  })

  describe('with a specified limit', () => {
    const limit = 2

    test('it splits segments into multiple levels when they overlap', () => {
      const segments = [
        { left: 1, right: 2 },
        { left: 2, right: 2 },
        { left: 3, right: 3 },
      ]

      const result = eventLevels(segments, limit)

      const expectedLevels = [[segments[0], segments[2]], [segments[1]]]
      expect(result.levels).toEqual(expectedLevels)
      expect(result.extra).toEqual([])
    })

    test('it adds segments to extra when there are more levels than allowed by the limit', () => {
      const segments = [
        { left: 1, right: 2 },
        { left: 2, right: 2 },
        { left: 2, right: 3 },
        { left: 3, right: 3 },
      ]

      const result = eventLevels(segments, limit)

      const expectedLevels = [[segments[0], segments[3]], [segments[1]]]
      const expectedExtra = [segments[2]]
      expect(result.levels).toEqual(expectedLevels)
      expect(result.extra).toEqual(expectedExtra)
    })
  })
})

describe('inRange', () => {
  const d = (...args) => new Date(2015, 3, ...args)

  const rangeStart = new Date(2017, 4, 1)
  const rangeEnd = new Date(2017, 5, 1)
  const accessors = { start: e => e.start, end: e => e.end }

  describe('matrix', () => {
    function compare(title, event, [rangeStart, rangeEnd], result = true) {
      it(`${title}: inRange ${result}`, () => {
        expect(inRange(event, rangeStart, rangeEnd, accessors)).toBe(result)
      })
    }
    const weekOfThe5th = [d(5), d(11)]
    const weekOfThe12th = [d(12), d(18)]
    ;[
      [
        'single day with time, 1 day range',
        { start: d(11, 5), end: d(11, 6) },
        [d(11), d(11)],
        true,
      ],
      [
        'multiday w/ time, 1 day range',
        { start: d(10, 5), end: d(11, 6) },
        [d(11), d(11)],
        true,
      ],
      [
        'single day event, end of the week',
        { start: d(11), end: d(12) },
        weekOfThe5th,
        true,
      ],
      [
        'single day event, middle of the week',
        { start: d(10), end: d(11) },
        weekOfThe5th,
        true,
      ],
      [
        'single day event, end of the week',
        { start: d(11), end: d(12) },
        weekOfThe12th,
        false,
      ],

      [
        'no duration, first of the week',
        { start: d(12), end: d(12) },
        weekOfThe12th,
        true,
      ],
      [
        'no duration, end of the week',
        { start: d(11), end: d(11) },
        weekOfThe5th,
        true,
      ],
      [
        'no duration, first of the next week',
        { start: d(12), end: d(12) },
        weekOfThe5th,
        false,
      ],
      [
        'no duration, middle of the week',
        { start: d(14), end: d(14) },
        weekOfThe12th,
        true,
      ],
      [
        'single day w/ time event, end of the week',
        { start: d(11, 10), end: d(11, 12) },
        weekOfThe5th,
        true,
      ],
      [
        'single day w/ time event, end of the week',
        { start: d(11, 10), end: d(11, 12) },
        weekOfThe12th,
        false,
      ],
      [
        'multi day w/ time event, end of the week',
        { start: d(11, 10), end: d(13, 12) },
        weekOfThe12th,
        true,
      ],
      [
        'single day w/ time event, middle of the week',
        { start: d(10, 10), end: d(10, 12) },
        weekOfThe5th,
        true,
      ],
      [
        'multi day event, first of the week',
        { start: d(11), end: d(13) },
        weekOfThe5th,
        true,
      ],
      [
        'multi day event, midnight of next the week',
        { start: d(11), end: d(13) },
        weekOfThe12th,
        true,
      ],
      [
        'multi day event w/ time, first of next the week',
        { start: d(11, 5), end: d(13, 5) },
        weekOfThe12th,
        true,
      ],
    ].forEach(g => compare(...g))
  })

  test('it returns true when event starts before the range end and ends after the range start', () => {
    const event = { start: new Date(2017, 4, 12), end: new Date(2017, 4, 31) }

    const result = inRange(event, rangeStart, rangeEnd, accessors)

    expect(result).toBeTruthy()
  })

  test('it returns false when event starts before the range end and ends before the range start', () => {
    const event = { start: new Date(2017, 3, 25), end: new Date(2017, 3, 28) }

    const result = inRange(event, rangeStart, rangeEnd, accessors)

    expect(result).toBeFalsy()
  })

  test('it returns false when event starts after the range end and ends after the range start', () => {
    const event = { start: new Date(2017, 5, 2), end: new Date(2017, 5, 3) }

    const result = inRange(event, rangeStart, rangeEnd, accessors)

    expect(result).toBeFalsy()
  })

  test('it returns true when event spans the whole range', () => {
    const event = { start: new Date(2017, 4, 1), end: new Date(2017, 5, 1) }

    const result = inRange(event, rangeStart, rangeEnd, accessors)

    expect(result).toBeTruthy()
  })

  test('it uses the start of the day for the event start date', () => {
    const event = {
      start: new Date(2017, 4, 1, 12),
      end: new Date(2017, 5, 1),
    }

    const result = inRange(event, rangeStart, rangeEnd, accessors)

    expect(result).toBeTruthy()
  })
})

describe('segsOverlap', () => {
  const segment = { left: 2, right: 3 }

  describe('when at least one segment overlaps', () => {
    const nonOverlappingSegment = { left: 1, right: 1 }

    test('when the overlapping segment partially overlaps on the left', () => {
      const overlappingSegment = { left: 1, right: 2 }
      const otherSegments = [nonOverlappingSegment, overlappingSegment]

      const result = segsOverlap(segment, otherSegments)

      expect(result).toBeTruthy()
    })

    test('when the overlapping segment partially overlaps on the right', () => {
      const overlappingSegment = { left: 3, right: 3 }
      const otherSegments = [nonOverlappingSegment, overlappingSegment]

      const result = segsOverlap(segment, otherSegments)

      expect(result).toBeTruthy()
    })

    test('when the overlapping segment fully overlaps', () => {
      const overlappingSegment = { left: 1, right: 4 }
      const otherSegments = [nonOverlappingSegment, overlappingSegment]

      const result = segsOverlap(segment, otherSegments)

      expect(result).toBeTruthy()
    })

    test('when the overlapping segment is identical', () => {
      const overlappingSegment = { left: 2, right: 3 }
      const otherSegments = [nonOverlappingSegment, overlappingSegment]

      const result = segsOverlap(segment, otherSegments)

      expect(result).toBeTruthy()
    })
  })

  test('it returns false if segment overlaps with no other segments', () => {
    const segmentToTheLeft = { left: 1, right: 1 }
    const segmentToTheRight = { left: 4, right: 5 }
    const otherSegments = [segmentToTheLeft, segmentToTheRight]

    const result = segsOverlap(segment, otherSegments)

    expect(result).toBeFalsy()
  })
})

describe('sortEvents', () => {
  const accessors = {
    start: e => e.start,
    end: e => e.end,
    allDay: e => e.allDay,
  }

  describe('when the events start on different calendar days', () => {
    const earlierEvent = {
      start: new Date(2017, 0, 1),
      end: new Date(2017, 0, 3),
    }
    const laterEvent = {
      start: new Date(2017, 0, 2),
      end: new Date(2017, 0, 3),
    }

    test('it returns a positive number when event B starts on a day before the start day of event A', () => {
      const result = sortEvents(laterEvent, earlierEvent, accessors)

      expect(result).toBeGreaterThan(0)
    })

    test('it returns a negative number when event A starts on a day before the start day of event B', () => {
      const result = sortEvents(earlierEvent, laterEvent, accessors)

      expect(result).toBeLessThan(0)
    })
  })

  describe('when the events start on the same calendar day', () => {
    describe('when the events have different durations', () => {
      const shorterEvent = {
        start: new Date(2017, 0, 1),
        end: new Date(2017, 0, 2),
      }
      const longerEvent = {
        start: new Date(2017, 0, 1),
        end: new Date(2017, 0, 4),
      }

      test('it returns a positive number when event B has a longer duration than event A', () => {
        const result = sortEvents(shorterEvent, longerEvent, accessors)

        expect(result).toBeGreaterThan(0)
      })

      test('it returns a negative number when event A has a longer duration than event B', () => {
        const result = sortEvents(longerEvent, shorterEvent, accessors)

        expect(result).toBeLessThan(0)
      })
    })

    describe('when the events have the same duration', () => {
      describe('when only one of the events is an all day event', () => {
        const allDayEvent = {
          start: new Date(2017, 0, 1),
          end: new Date(2017, 0, 2),
          allDay: true,
        }
        const nonAllDayEvent = {
          start: new Date(2017, 0, 1),
          end: new Date(2017, 0, 2),
          allDay: false,
        }

        test('it returns a positive number when event B is an all day event', () => {
          const result = sortEvents(nonAllDayEvent, allDayEvent, accessors)

          expect(result).toBeGreaterThan(0)
        })

        test('it returns a negative number when event A is an all day event', () => {
          const result = sortEvents(allDayEvent, nonAllDayEvent, accessors)

          expect(result).toBeLessThan(0)
        })
      })

      describe('when both of the events are all day events', () => {
        const allDayEvent = {
          start: new Date(2017, 0, 1),
          end: new Date(2017, 0, 2),
          allDay: true,
        }
        const otherAllDayEvent = {
          start: new Date(2017, 0, 1),
          end: new Date(2017, 0, 2),
          allDay: true,
        }

        test('it returns zero', () => {
          const result = sortEvents(allDayEvent, otherAllDayEvent, accessors)

          expect(result).toBe(0)
        })
      })

      describe('when neither of the events are all day events', () => {
        const earlierEvent = {
          start: new Date(2017, 0, 1, 12),
          end: new Date(2017, 0, 2),
          allDay: false,
        }
        const laterEvent = {
          start: new Date(2017, 0, 1, 16),
          end: new Date(2017, 0, 2),
          allDay: false,
        }

        test('it returns a positive number when event B starts at an earlier time than event A', () => {
          const result = sortEvents(laterEvent, earlierEvent, accessors)

          expect(result).toBeGreaterThan(0)
        })

        test('it returns a negative number when event A starts at an earlier time than event B', () => {
          const result = sortEvents(earlierEvent, laterEvent, accessors)

          expect(result).toBeLessThan(0)
        })

        test('it returns zero when both events start at the same time', () => {
          const otherEarlierEvent = Object.assign({}, earlierEvent)
          const result = sortEvents(earlierEvent, otherEarlierEvent, accessors)

          expect(result).toBe(0)
        })
      })
    })
  })
})
