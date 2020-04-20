"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.monthsInYear = monthsInYear;
exports.firstVisibleDay = firstVisibleDay;
exports.lastVisibleDay = lastVisibleDay;
exports.visibleDays = visibleDays;
exports.ceil = ceil;
exports.range = range;
exports.merge = merge;
exports.eqTime = eqTime;
exports.isJustDate = isJustDate;
exports.duration = duration;
exports.diff = diff;
exports.total = total;
exports.week = week;
exports.today = today;
exports.yesterday = yesterday;
exports.tomorrow = tomorrow;
exports.max = exports.min = exports.inRange = exports.lt = exports.lte = exports.gt = exports.gte = exports.eq = exports.add = exports.endOf = exports.startOf = exports.month = exports.hours = exports.minutes = exports.seconds = exports.milliseconds = void 0;

var dates = _interopRequireWildcard(require("date-arithmetic"));

exports.milliseconds = dates.milliseconds;
exports.seconds = dates.seconds;
exports.minutes = dates.minutes;
exports.hours = dates.hours;
exports.month = dates.month;
exports.startOf = dates.startOf;
exports.endOf = dates.endOf;
exports.add = dates.add;
exports.eq = dates.eq;
exports.gte = dates.gte;
exports.gt = dates.gt;
exports.lte = dates.lte;
exports.lt = dates.lt;
exports.inRange = dates.inRange;
exports.min = dates.min;
exports.max = dates.max;

/* eslint no-fallthrough: off */
var MILLI = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24
};
var MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function monthsInYear(year) {
  var date = new Date(year, 0, 1);
  return MONTHS.map(function (i) {
    return dates.month(date, i);
  });
}

function firstVisibleDay(date, localizer) {
  var firstOfMonth = dates.startOf(date, 'month');
  return dates.startOf(firstOfMonth, 'week', localizer.startOfWeek());
}

function lastVisibleDay(date, localizer) {
  var endOfMonth = dates.endOf(date, 'month');
  return dates.endOf(endOfMonth, 'week', localizer.startOfWeek());
}

function visibleDays(date, localizer) {
  var current = firstVisibleDay(date, localizer),
      last = lastVisibleDay(date, localizer),
      days = [];

  while (dates.lte(current, last, 'day')) {
    days.push(current);
    current = dates.add(current, 1, 'day');
  }

  return days;
}

function ceil(date, unit) {
  var floor = dates.startOf(date, unit);
  return dates.eq(floor, date) ? floor : dates.add(floor, 1, unit);
}

function range(start, end, unit) {
  if (unit === void 0) {
    unit = 'day';
  }

  var current = start,
      days = [];

  while (dates.lte(current, end, unit)) {
    days.push(current);
    current = dates.add(current, 1, unit);
  }

  return days;
}

function merge(date, time) {
  if (time == null && date == null) return null;
  if (time == null) time = new Date();
  if (date == null) date = new Date();
  date = dates.startOf(date, 'day');
  date = dates.hours(date, dates.hours(time));
  date = dates.minutes(date, dates.minutes(time));
  date = dates.seconds(date, dates.seconds(time));
  return dates.milliseconds(date, dates.milliseconds(time));
}

function eqTime(dateA, dateB) {
  return dates.hours(dateA) === dates.hours(dateB) && dates.minutes(dateA) === dates.minutes(dateB) && dates.seconds(dateA) === dates.seconds(dateB);
}

function isJustDate(date) {
  return dates.hours(date) === 0 && dates.minutes(date) === 0 && dates.seconds(date) === 0 && dates.milliseconds(date) === 0;
}

function duration(start, end, unit, firstOfWeek) {
  if (unit === 'day') unit = 'date';
  return Math.abs(dates[unit](start, undefined, firstOfWeek) - dates[unit](end, undefined, firstOfWeek));
}

function diff(dateA, dateB, unit) {
  if (!unit || unit === 'milliseconds') return Math.abs(+dateA - +dateB); // the .round() handles an edge case
  // with DST where the total won't be exact
  // since one day in the range may be shorter/longer by an hour

  return Math.round(Math.abs(+dates.startOf(dateA, unit) / MILLI[unit] - +dates.startOf(dateB, unit) / MILLI[unit]));
}

function total(date, unit) {
  var ms = date.getTime(),
      div = 1;

  switch (unit) {
    case 'week':
      div *= 7;

    case 'day':
      div *= 24;

    case 'hours':
      div *= 60;

    case 'minutes':
      div *= 60;

    case 'seconds':
      div *= 1000;
  }

  return ms / div;
}

function week(date) {
  var d = new Date(date);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
}

function today() {
  return dates.startOf(new Date(), 'day');
}

function yesterday() {
  return dates.add(dates.startOf(new Date(), 'day'), -1, 'day');
}

function tomorrow() {
  return dates.add(dates.startOf(new Date(), 'day'), 1, 'day');
}