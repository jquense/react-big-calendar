import moment from 'moment';

const format = (date, formatString) =>
  moment(date).format(formatString);

const renderTime = time => {
  if (format(time, 'mm') === '00') {
    return format(time, 'ha');
  }
  return format(time, 'h:mma');
};

export default renderTime;
