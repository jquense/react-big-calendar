export default [
  {
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2016, 2, 13, 0, 0, 0),
    'end': new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'start': new Date(2015, 3, 9, 0, 0, 0),
    'end': new Date(2015, 3, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2015, 3, 11),
    'end': new Date(2015, 3, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start':new Date(2015, 3, 12, 12, 0, 0, 0),
    'end': new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start':new Date(2015, 3, 12,14, 0, 0, 0),
    'end': new Date(2015, 3, 12,15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start':new Date(2015, 3, 12, 17, 0, 0, 0),
    'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start':new Date(2015, 3, 12, 20, 0, 0, 0),
    'end': new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start':new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  },
  ...today(1)
]

function today(idx = 0) {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()

  const sets = [
    [
      {
        'title': 'Event 1',
        'start': new Date(y, m, d, 10, 30, 0, 0),
        'end': new Date(y, m, d, 13, 30, 0, 0)
      },
      {
        'title': 'Event 2',
        'start': new Date(y, m, d, 10, 30, 0, 0),
        'end': new Date(y, m, d, 13, 30, 0, 0)
      },
      {
        'title': 'Event 3',
        'start': new Date(y, m, d, 10, 30, 0, 0),
        'end': new Date(y, m, d, 12, 30, 0, 0)
      },
      {
        'title': 'Event 4',
        'start': new Date(y, m, d, 8, 30, 0, 0),
        'end': new Date(y, m, d, 18, 0, 0, 0)
      },
      {
        'title': 'Event 5',
        'start': new Date(y, m, d, 15, 30, 0, 0),
        'end': new Date(y, m, d, 16, 0, 0, 0)
      },
      {
        'title': 'Event 6',
        'start': new Date(y, m, d, 11, 0, 0, 0),
        'end': new Date(y, m, d, 12, 0, 0, 0)
      },
      {
        'title': 'Event 7',
        'start': new Date(y, m, d, 1, 0, 0, 0),
        'end': new Date(y, m, d, 2, 0, 0, 0)
      }
    ],
    [
      {
        'title': 'Event 1',
        'start': new Date(y, m, d, 9, 30, 0, 0),
        'end': new Date(y, m, d, 15, 30, 0, 0)
      },
      {
        'title': 'Event 2',
        'start': new Date(y, m, d, 11, 0, 0, 0),
        'end': new Date(y, m, d, 13, 0, 0, 0)
      },
      {
        'title': 'Event 3',
        'start': new Date(y, m, d, 9, 30, 0, 0),
        'end': new Date(y, m, d, 11, 30, 0, 0)
      },
      {
        'title': 'Event 4',
        'start': new Date(y, m, d, 9, 30, 0, 0),
        'end': new Date(y, m, d, 10, 30, 0, 0)
      },
      {
        'title': 'Event 5',
        'start': new Date(y, m, d, 10, 0, 0, 0),
        'end': new Date(y, m, d, 11, 0, 0, 0)
      },
      {
        'title': 'Event 6',
        'start': new Date(y, m, d, 10, 0, 0, 0),
        'end': new Date(y, m, d, 11, 0, 0, 0)
      },
      {
        'title': 'Event 7',
        'start': new Date(y, m, d, 9, 30, 0, 0),
        'end': new Date(y, m, d, 10, 30, 0, 0)
      },
      {
        'title': 'Event 8',
        'start': new Date(y, m, d, 9, 30, 0, 0),
        'end': new Date(y, m, d, 10, 30, 0, 0)
      },
      {
        'title': 'Event 9',
        'start': new Date(y, m, d, 9, 30, 0, 0),
        'end': new Date(y, m, d, 10, 30, 0, 0)
      },
      {
        'title': 'Event 10',
        'start': new Date(y, m, d, 10, 30, 0, 0),
        'end': new Date(y, m, d, 12, 30, 0, 0)
      },
      {
        'title': 'Event 11',
        'start': new Date(y, m, d, 12, 0, 0, 0),
        'end': new Date(y, m, d, 13, 0, 0, 0)
      },
      {
        'title': 'Event 12',
        'start': new Date(y, m, d, 12, 0, 0, 0),
        'end': new Date(y, m, d, 13, 0, 0, 0)
      },
      {
        'title': 'Event 13',
        'start': new Date(y, m, d, 12, 0, 0, 0),
        'end': new Date(y, m, d, 13, 0, 0, 0)
      },
      {
        'title': 'Event 14',
        'start': new Date(y, m, d, 12, 0, 0, 0),
        'end': new Date(y, m, d, 13, 0, 0, 0)
      },
      {
        'title': 'Event 15',
        'start': new Date(y, m, d, 6, 30, 0, 0),
        'end': new Date(y, m, d, 8, 0, 0, 0)
      },
    ],
    [
      {
        'title': 'Event 1',
        'start': new Date(y, m, d, 2, 30, 0, 0),
        'end': new Date(y, m, d, 4, 30, 0, 0)
      },
      {
        'title': 'Event 2',
        'start': new Date(y, m, d, 2, 30, 0, 0),
        'end': new Date(y, m, d, 3, 30, 0, 0)
      },
      {
        'title': 'Event 3',
        'start': new Date(y, m, d, 3, 0, 0, 0),
        'end': new Date(y, m, d, 4, 0, 0, 0)
      }
    ]

  ]

  return sets[idx]
}
