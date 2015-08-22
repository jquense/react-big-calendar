var globalize = require('globalize')
var shortNames = Object.create(null);

function getCulture(culture){
  return culture
    ? globalize.findClosestCulture(culture)
    : globalize.culture()
}

function endOfDecade(date) {
  date = new Date(date)
  date.setFullYear(date.getFullYear() + 10)
  date.setMilliseconds(date.getMilliseconds() - 1)
  return date
}

function endOfCentury(date) {
  date = new Date(date)
  date.setFullYear(date.getFullYear() + 100)
  date.setMilliseconds(date.getMilliseconds() - 1)
  return date
}

function firstOfWeek(culture) {
  culture = getCulture(culture)
  return (culture && culture.calendar.firstDay) || 0
}

function shortDay(dayOfTheWeek){
  var culture = getCulture(arguments[1])
    , name = culture.name
    , start = firstOfWeek(culture)

  var names = shortNames[name] || (shortNames[name] = days());

  return names[dayOfTheWeek];

  function days() {
    var days = culture.calendar.days.namesShort.slice()
    return start === 0 ? days : days.concat(days.splice(0, start))
  }
}

export default {

  formats: {
    date: 'd',
    time: 't',
    default: 'f',
    header: 'MMMM yyyy',
    footer: 'D',
    weekday: shortDay,
    dayOfMonth: 'dd',
    month: 'MMM',
    year: 'yyyy',

    decade: function(date, culture, localizer) {
      return localizer.format(date, 'yyyy', culture)
        + ' - ' + localizer.format(endOfDecade(date), 'yyyy', culture)
    },

    century: function(date, culture, localizer) {
      return localizer.format(date, 'yyyy', culture)
        + ' - ' + localizer.format(endOfCentury(date), 'yyyy', culture)
    }
  },

  firstOfWeek: firstOfWeek,

  parse: function(value, format, culture){
    return globalize.parseDate(value, format, culture)
  },

  format: function(value, format, culture){
    return globalize.format(value, format, culture)
  }
}