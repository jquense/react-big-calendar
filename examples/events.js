import { ZonedDateTime, ZoneId, nativeJs } from 'js-joda'
export default [
  {
    id: 0,
    title: 'jambori',
    start: ZonedDateTime.from(nativeJs(new Date(2018, 4, 25, 9))),
    end: ZonedDateTime.from(nativeJs(new Date(2018, 4, 25, 12))),
  },
  {
    id: 1,
    title: 'Berlin jambori',
    start: ZonedDateTime.parse('2018-05-25T18:00+02:00[Europe/Berlin]'),
    end: ZonedDateTime.parse('2018-05-25T21:00+02:00[Europe/Berlin]'),
  },
  {
    id: 2,
    title: 'Japan jambori',
    start: ZonedDateTime.parse('2018-05-26T01:00+09:00[Asia/Tokyo]'),
    end: ZonedDateTime.parse('2018-05-26T04:00+09:00[Asia/Tokyo]'),
  },
  // {
  //   id: 2,
  //   title: 'Long Event',
  //   start: ZonedDateTime.parse(nativeJs(new Date(2015, 3, 7))),
  //   end: ZonedDateTime.parse(nativeJs(new Date(2015, 3, 10))),
  // },
  // {
  //   id: 3,
  //   title: 'Long Event',
  //   start: ZonedDateTime.parse(nativeJs(new Date(2015, 3, 7))),
  //   end: ZonedDateTime.parse(nativeJs(new Date(2015, 3, 10))),
  // },
]
