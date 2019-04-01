import dates from './dates'

/**
 * Gets the timezone offset difference between the start of the given day and
 * the end of the given day. This usually only happens during daylight savings,
 * springing forward/falling back.
 */
export function getDaylightSavingsShift(date) {
  const dayStart = dates.startOf(date, 'day');
  const dayEnd = dates.endOf(date, 'day');
  return dayStart.getTimezoneOffset() - dayEnd.getTimezoneOffset();
}

/**
 * @param {Date|number} dateOrShift - either a date to check, or a shift value
 * obtained via getDaylightSavingsShift
 */
export function isDaylightSavingsSpring(dateOrShift) {
  const shift = dateOrShift instanceof Date ? getDaylightSavingsShift(dateOrShift) : dateOrShift;
  return shift > 0;
}

/**
 * @param {Date|number} dateOrShift - either a date to check, or a shift value
 * obtained via getDaylightSavingsShift
 */
export function isDaylightSavingsFall(dateOrShift) {
  const shift = dateOrShift instanceof Date ? getDaylightSavingsShift(dateOrShift) : dateOrShift;
  return shift < 0;
}
