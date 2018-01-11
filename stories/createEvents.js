export default function createEvents(idx = 0, date = new Date()) {
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()

  const sets = [
    [
      {
        title: 'Event 1',
        start: new Date(y, m, d, 10, 30, 0, 0),
        end: new Date(y, m, d, 13, 30, 0, 0),
      },
      {
        title: 'Event 2',
        start: new Date(y, m, d, 10, 30, 0, 0),
        end: new Date(y, m, d, 13, 30, 0, 0),
      },
      {
        title: 'Event 3',
        start: new Date(y, m, d, 10, 30, 0, 0),
        end: new Date(y, m, d, 12, 30, 0, 0),
      },
      {
        title: 'Event 4',
        start: new Date(y, m, d, 8, 30, 0, 0),
        end: new Date(y, m, d, 18, 0, 0, 0),
      },
      {
        title: 'Event 5',
        start: new Date(y, m, d, 15, 30, 0, 0),
        end: new Date(y, m, d, 16, 0, 0, 0),
      },
      {
        title: 'Event 6',
        start: new Date(y, m, d, 11, 0, 0, 0),
        end: new Date(y, m, d, 12, 0, 0, 0),
      },
      {
        title: 'Event 7',
        start: new Date(y, m, d, 1, 0, 0, 0),
        end: new Date(y, m, d, 2, 0, 0, 0),
      },
    ],
    [
      {
        title: 'Event 1',
        start: new Date(y, m, d, 9, 30, 0, 0),
        end: new Date(y, m, d, 15, 30, 0, 0),
      },
      {
        title: 'Event 2',
        start: new Date(y, m, d, 11, 0, 0, 0),
        end: new Date(y, m, d, 13, 0, 0, 0),
      },
      {
        title: 'Event 3',
        start: new Date(y, m, d, 9, 30, 0, 0),
        end: new Date(y, m, d, 11, 30, 0, 0),
      },
      {
        title: 'Event 4',
        start: new Date(y, m, d, 9, 30, 0, 0),
        end: new Date(y, m, d, 10, 30, 0, 0),
      },
      {
        title: 'Event 5',
        start: new Date(y, m, d, 10, 0, 0, 0),
        end: new Date(y, m, d, 11, 0, 0, 0),
      },
      {
        title: 'Event 6',
        start: new Date(y, m, d, 10, 0, 0, 0),
        end: new Date(y, m, d, 11, 0, 0, 0),
      },
      {
        title: 'Event 7',
        start: new Date(y, m, d, 9, 30, 0, 0),
        end: new Date(y, m, d, 10, 30, 0, 0),
      },
      {
        title: 'Event 8',
        start: new Date(y, m, d, 9, 30, 0, 0),
        end: new Date(y, m, d, 10, 30, 0, 0),
      },
      {
        title: 'Event 9',
        start: new Date(y, m, d, 9, 30, 0, 0),
        end: new Date(y, m, d, 10, 30, 0, 0),
      },
      {
        title: 'Event 10',
        start: new Date(y, m, d, 10, 30, 0, 0),
        end: new Date(y, m, d, 12, 30, 0, 0),
      },
      {
        title: 'Event 11',
        start: new Date(y, m, d, 12, 0, 0, 0),
        end: new Date(y, m, d, 13, 0, 0, 0),
      },
      {
        title: 'Event 12',
        start: new Date(y, m, d, 12, 0, 0, 0),
        end: new Date(y, m, d, 13, 0, 0, 0),
      },
      {
        title: 'Event 13',
        start: new Date(y, m, d, 12, 0, 0, 0),
        end: new Date(y, m, d, 13, 0, 0, 0),
      },
      {
        title: 'Event 14',
        start: new Date(y, m, d, 12, 0, 0, 0),
        end: new Date(y, m, d, 13, 0, 0, 0),
      },
      {
        title: 'Event 15',
        start: new Date(y, m, d, 6, 30, 0, 0),
        end: new Date(y, m, d, 8, 0, 0, 0),
      },
      {
        title: 'Event 16',
        start: new Date(y, m, d, 16, 0, 0, 0),
        end: new Date(y, m, d, 17, 30, 0, 0),
      },
    ],
    [
      {
        title: 'Event 1',
        start: new Date(y, m, d, 2, 30, 0, 0),
        end: new Date(y, m, d, 4, 30, 0, 0),
      },
      {
        title: 'Event 2',
        start: new Date(y, m, d, 2, 30, 0, 0),
        end: new Date(y, m, d, 3, 30, 0, 0),
      },
      {
        title: 'Event 3',
        start: new Date(y, m, d, 3, 0, 0, 0),
        end: new Date(y, m, d, 4, 0, 0, 0),
      },
    ],
    [
      {
        title: 'Event 1',
        start: new Date(y, m, d, 6, 30, 0, 0),
        end: new Date(y, m, d, 7, 0, 0, 0),
      },
      {
        title: 'Event 2',
        start: new Date(y, m, d, 8, 0, 0, 0),
        end: new Date(y, m, d, 17, 0, 0, 0),
      },
      {
        title: 'Event 3',
        start: new Date(y, m, d, 8, 0, 0, 0),
        end: new Date(y, m, d, 11, 0, 0, 0),
      },
      {
        title: 'Event 4',
        start: new Date(y, m, d, 8, 0, 0, 0),
        end: new Date(y, m, d, 12, 0, 0, 0),
      },
      {
        title: 'Event 5',
        start: new Date(y, m, d, 10, 0, 0, 0),
        end: new Date(y, m, d, 13, 0, 0, 0),
      },
      {
        title: 'Event 6',
        start: new Date(y, m, d, 10, 0, 0, 0),
        end: new Date(y, m, d, 13, 0, 0, 0),
      },
      {
        title: 'Event 7',
        start: new Date(y, m, d, 10, 0, 0, 0),
        end: new Date(y, m, d, 13, 0, 0, 0),
      },
    ],
    [
      {
        title: 'Event 1',
        start: new Date(y, m, d, 19, 0, 0, 0),
        end: new Date(y, m, d, 20, 55, 0, 0),
      },
      {
        title: 'Event 2',
        start: new Date(y, m, d, 19, 15, 0, 0),
        end: new Date(y, m, d, 20, 15, 0, 0),
      },
      {
        title: 'Event 3',
        start: new Date(y, m, d, 19, 45, 0, 0),
        end: new Date(y, m, d, 22, 30, 0, 0),
      },
      {
        title: 'Event 4',
        start: new Date(y, m, d, 20, 45, 0, 0),
        end: new Date(y, m, d, 22, 5, 0, 0),
      },
      {
        title: 'Event 5',
        start: new Date(y, m, d, 10, 0, 0, 0),
        end: new Date(y, m, d, 11, 0, 0, 0),
      },
      {
        title: 'Event 6',
        start: new Date(y, m, d, 10, 30, 0, 0),
        end: new Date(y, m, d, 11, 30, 0, 0),
      },
    ],
  ]

  return sets[idx]
}
