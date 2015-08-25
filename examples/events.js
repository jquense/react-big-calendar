// import Chance from 'chance';

// let chance = new Chance();
// let events = []

// for (var i = 0; i < 300; i++) {
//   events.push({
//     start: chance.date({ year: 2015 }),
//   })

export default [
  {
    "title": "All Day Event",
    "allDay": true,
    "start": new Date(2015, 1, 1),
    "end": new Date(2015, 1, 1)
  },
  {
    "title": "Long Event",
    "start": new Date(2015, 1, 7),
    "end": new Date(2015, 1, 10),
  },
  {
    "title": "Some Event",
    "start": new Date(2015, 1, 9, 0, 0, 0),
    "end": new Date(2015, 1, 9, 0, 0, 0),
  },
  {
    "title": "Conference",
    "start": new Date(2015, 1, 11),
    "end": new Date(2015, 1, 13)
  },
  {
    "title": "Meeting",
    "start": new Date(2015, 1, 12, 10, 30, 0, 0),
    "end": new Date(2015, 1, 12, 12, 30, 0, 0)
  },
  {
    "title": "Lunch",
    "start":new Date(2015, 1, 12, 12, 0, 0, 0),
    "end": new Date(2015, 1, 12, 13, 0, 0, 0)
  },
  {
    "title": "Meeting",
    "start":new Date(2015, 1, 12,14, 0, 0, 0),
    "end": new Date(2015, 1, 12,15, 0, 0, 0)
  },
  {
    "title": "Happy Hour",
    "start":new Date(2015, 1, 12, 17, 0, 0, 0),
    "end": new Date(2015, 1, 12, 17, 30, 0, 0)
  },
  {
    "title": "Dinner",
    "start":new Date(2015, 1, 12, 20, 0, 0, 0),
    "end": new Date(2015, 1, 12, 21, 0, 0, 0)
  },
  {
    "title": "Birthday Party",
    "start":new Date(2015, 1, 13, 7, 0, 0),
    "end": new Date(2015, 1, 13, 10, 30, 0)
  }
]
