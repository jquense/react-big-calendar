import moment from 'moment'
import _ from 'lodash'

export function getTimeslots(events, min, max) {
  let minHour = moment(min).hour();
  let maxHour = moment(max).hour();

  let dict = {};
  for (let i = minHour; i <= maxHour; i++ ) {
    dict[moment(new Date()).hour(i).minute(0).format('HH:mm')] = true
  }
  let minWithoutDate = moment(moment(min).format('HH:mm'), 'HH:mm');
  let maxWithoutDate = moment(moment(max).format('HH:mm'), 'HH:mm');
  _.forEach(events, function(e) {
    const startWithoutDate = moment(moment(e.start).format('HH:mm'), 'HH,mm');
    const endWithoutDate = moment(moment(e.end).format('HH:mm'), 'HH:mm');
    if (startWithoutDate.isBetween(minWithoutDate, maxWithoutDate)) {
      dict[moment(e.start).format('HH:mm')] = true;
    }
    if (endWithoutDate.isBetween(minWithoutDate, maxWithoutDate)) {
      dict[moment(e.end).format('HH:mm')] = true;
    }
  });
  return _.sortBy(Object.keys(dict))
}
