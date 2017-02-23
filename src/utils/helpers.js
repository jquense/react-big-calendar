var idCount = 0;

function uniqueId (prefix) {
  return '' + ((prefix == null ? '' : prefix) + (++idCount));
}

export function notify(handler, args){
  handler && handler.apply(null, [].concat(args))
}

export function instanceId(component, suffix = ''){
  component.__id || (component.__id = uniqueId('rw_'))
  return (component.props.id || component.__id) + suffix
}

export function isFirstFocusedRender(component){
  return component._firstFocus || (component.state.focused && (component._firstFocus = true))
}

export function dateIsInBusinessHours(date, businessHours, endIncluded = false){
  // time : HH:MM
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const weekDay = date.getDay();

  return businessHours.some((businessHour) => {
    const start = extractHoursMinutesFromTime(businessHour.start);
    const end = extractHoursMinutesFromTime(businessHour.end);

    return businessHour.dow.includes(weekDay)
      && (hours == start.hours && minutes >= start.minutes || hours > start.hours)
      && (hours == end.hours && (endIncluded ? minutes <= end.minutes : minutes < end.minutes) || hours < end.hours );
  });
}

export function extractHoursMinutesFromTime(time){
  // time : HH:MM
  const values = time.split(":");

  return {
    hours: values[0] ? parseInt(values[0]) : 0,
    minutes: values[1] ? parseInt(values[1]) : 0
  };
}