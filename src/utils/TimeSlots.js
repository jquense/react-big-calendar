const getKey = ({ min, max, step, slots, localizer }) =>
  `${+localizer.startOf(min, 'minutes')}` +
  `${+localizer.startOf(max, 'minutes')}` +
  `${step}-${slots}`

export function getSlotMetrics({
  min: start,
  max: end,
  step,
  timeslots,
  localizer,
}) {
  const key = getKey({ start, end, step, timeslots, localizer })

  // DST differences are handled inside the localizer
  const totalMin = 1 + localizer.getTotalMin(start, end)
  const minutesFromMidnight = localizer.getMinutesFromMidnight(start)
  const numGroups = Math.ceil((totalMin - 1) / (step * timeslots))
  const numSlots = numGroups * timeslots

  const groups = new Array(numGroups)
  const slots = new Array(numSlots)
  // Each slot date is created from "zero", instead of adding `step` to
  // the previous one, in order to avoid DST oddities
  for (let grp = 0; grp < numGroups; grp++) {
    groups[grp] = new Array(timeslots)

    for (let slot = 0; slot < timeslots; slot++) {
      const slotIdx = grp * timeslots + slot
      const minFromStart = slotIdx * step
      // A date with total minutes calculated from the start of the day
      slots[slotIdx] = groups[grp][slot] = localizer.getSlotDate(
        start,
        minutesFromMidnight,
        minFromStart
      )
    }
  }

  // Necessary to be able to select up until the last timeslot in a day
  const lastSlotMinFromStart = slots.length * step
  slots.push(
    localizer.getSlotDate(start, minutesFromMidnight, lastSlotMinFromStart)
  )

  function positionFromDate(date) {
    const diff = localizer.getTotalMin(start, date)
    return Math.min(diff, totalMin)
  }

  return {
    groups,
    update(args) {
      if (getKey(args) !== key) return getSlotMetrics(args)
      return this
    },

    dateIsInGroup(date, groupIndex) {
      const nextGroup = groups[groupIndex + 1]
      return localizer.inRange(
        date,
        groups[groupIndex][0],
        nextGroup ? nextGroup[0] : end,
        'minutes'
      )
    },

    nextSlot(slot) {
      let next = slots[Math.min(slots.indexOf(slot) + 1, slots.length - 1)]
      // in the case of the last slot we won't a long enough range so manually get it
      if (next === slot) next = localizer.add(slot, step, 'minutes')
      return next
    },

    closestSlotToPosition(percent) {
      const slot = Math.min(
        slots.length - 1,
        Math.max(0, Math.floor(percent * numSlots))
      )
      return slots[slot]
    },

    closestSlotFromPoint(point, boundaryRect) {
      let range = Math.abs(boundaryRect.top - boundaryRect.bottom)
      return this.closestSlotToPosition((point.y - boundaryRect.top) / range)
    },

    closestSlotFromDate(date, offset = 0) {
      if (localizer.lt(date, start, 'minutes')) return slots[0]

      const diffMins = localizer.diff(start, date, 'minutes')
      return slots[(diffMins - (diffMins % step)) / step + offset]
    },

    startsBeforeDay(date) {
      return localizer.lt(date, start, 'day')
    },

    startsAfterDay(date) {
      return localizer.gt(date, end, 'day')
    },

    startsBefore(date) {
      return localizer.lt(localizer.merge(start, date), start, 'minutes')
    },

    startsAfter(date) {
      return localizer.gt(localizer.merge(end, date), end, 'minutes')
    },

    getRange(rangeStart, rangeEnd, ignoreMin, ignoreMax) {
      if (!ignoreMin)
        rangeStart = localizer.min(end, localizer.max(start, rangeStart))
      if (!ignoreMax)
        rangeEnd = localizer.min(end, localizer.max(start, rangeEnd))

      const rangeStartMin = positionFromDate(rangeStart)
      const rangeEndMin = positionFromDate(rangeEnd)
      const top =
        rangeEndMin > step * numSlots && !localizer.eq(end, rangeEnd)
          ? ((rangeStartMin - step) / (step * numSlots)) * 100
          : (rangeStartMin / (step * numSlots)) * 100

      return {
        top,
        height: (rangeEndMin / (step * numSlots)) * 100 - top,
        start: positionFromDate(rangeStart),
        startDate: rangeStart,
        end: positionFromDate(rangeEnd),
        endDate: rangeEnd,
      }
    },

    getCurrentTimePosition(rangeStart) {
      const rangeStartMin = positionFromDate(rangeStart)
      const top = (rangeStartMin / (step * numSlots)) * 100

      return top
    },
  }
}
