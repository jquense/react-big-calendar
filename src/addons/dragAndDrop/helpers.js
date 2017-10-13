import compose from './compose';
import addHours from 'date-fns/add_hours';
import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';
import addMinutes from 'date-fns/add_minutes';
import startOfDay from 'date-fns/start_of_day';
import addMilliseconds from 'date-fns/add_milliseconds';

export function merge(dropDate, start) {
  const [hours, mins] = [getHours(start), getMinutes(start)];
  const drop = startOfDay(addMilliseconds(dropDate, 1));
  return compose(v => addHours(v, hours), v => addMinutes(v, mins))(drop);
}
