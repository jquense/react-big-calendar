import * as helpers from '../helpers';
import addDays from 'date-fns/add_days';
import getDate from 'date-fns/get_date';
import getHours from 'date-fns/get_hours';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

describe('Helpers', () => {
  describe('merge()', () => {
    test('when drop date is greater than current date', () => {
      const start = new Date('2017-10-13T22:42:42.790Z');
      const dropDate = addDays(start, 1);
      const nextDate = helpers.merge(dropDate, start);

      const diffInDays = differenceInCalendarDays(nextDate, start);
      const hours = getHours(nextDate);
      const day = getDate(nextDate);

      // expect(diffInDays).toEqual(1);
      // expect(hours).toEqual(17);
      // expect(day).toEqual(14);
    });
    test('when drop date is less than current date', () => {
      const dropDate = new Date('2017-10-13T22:42:42.790Z');
      const start = addDays(dropDate, 1);
      const nextDate = helpers.merge(dropDate, start);

      const diffInDays = differenceInCalendarDays(nextDate, start);
      const hours = getHours(nextDate);
      const day = getDate(nextDate);

      // expect(diffInDays).toEqual(-1);
      // expect(hours).toEqual(17);
      // expect(day).toEqual(12);
    });
    test('when drop date is equal to current date', () => {
      /* T04:00 is the UTC Offset - AR Fri Oct 13 21:19:19 EDT 2017 */
      const dropDate = new Date('2017-10-13T04:00:00.000Z');
      const start = new Date('2017-10-13T22:42:42.790Z');
      const nextDate = helpers.merge(dropDate, start);

      const diffInDays = differenceInCalendarDays(nextDate, start);
      const hours = getHours(nextDate);
      const day = getDate(nextDate);

      // expect(diffInDays).toEqual(-1);
      // expect(hours).toEqual(17);
      // expect(day).toEqual(13);
    });
  });
});
