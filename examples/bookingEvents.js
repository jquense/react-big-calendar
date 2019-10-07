import React from 'react'

const now = new Date()

export default [
  {
    id: 0,
    title: <span>'All Day Event very long title'</span>,
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 2,
    title: <span>All Day Event very long title</span>,
    allDay: true,
    start: new Date(2015, 3, 1),
    end: new Date(2015, 3, 2),
  },
  {
    id: 23,
    title: <span>All Day Event very long title</span>,
    allDay: true,
    start: new Date(2015, 3, 4),
    end: new Date(2015, 3, 13),
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2015, 3, 17, 0, 0, 0),
    end: new Date(2015, 3, 18, 0, 0, 0),
  },
]
