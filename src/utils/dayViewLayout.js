import { accessor as get } from './accessors'
import dates from './dates'

export function startsBefore(date, min) {
  return dates.lt(dates.merge(min, date), min, 'minutes')
}

export function positionFromDate(date, min, total) {
  if (startsBefore(date, min))
    return 0

  let diff = dates.diff(min, dates.merge(min, date), 'minutes')
  return Math.min(diff, total)
}

/**
 * Events will be sorted primarily according to earliest start time.
 * If two events start at the same time, the one with the longest duration will
 * be placed first. If they also have the same duration, then they will be sorted
 * by their entity keys if `entityKeyAccessor` prop was provided to the calendar.
 */
let sort = (events, { startAccessor, endAccessor, entityKeyAccessor }) => events.sort((a, b) => {
  let startA = +get(a, startAccessor)
  let startB = +get(b, startAccessor)

  if (startA === startB) {
    const endTimeSort = +get(b, endAccessor) - +get(a, endAccessor);
    if (endTimeSort === 0 && entityKeyAccessor) {
      // entity key may be a number, so cast to string first... this breaks logical
      // sorting of numbers, but we're really just looking for a consistent sort.
      return (String(a[entityKeyAccessor]).localeCompare(String(b[entityKeyAccessor])));
    }
    return endTimeSort;
  }

  return startA - startB
})

let getSlot = (event, accessor, min, totalMin, isEndAccessor = false) => {
  // This is here for 'logic parity' with what was here before (event && positionFromDate(...)).
  // Not actually sure under what conditions a falsy event is passed in yet. - Sidney
  if (!event) return event;

  let time = get(event, accessor);

  // If start/end of the event is on the day that daylight savings FALLS BACK,
  // then we need to adjust because the number of calendar slots doesn't match
  // the number of hours in that day (we don't show two slots for the two 2AMs
  // that exist). So, for example, 5 AM on this day is actually 6 hours after
  // 12 AM, but we will use 4 AM to calculate the difference when comparing to
  // 12 AM since we want to obtain a practical result of a 5 hour difference
  // (and 4 AM is five hours after 1 AM on this day due to having two 2 AMs).
  //
  // We don't have to do this for SPRINGING FORWARD because the calendar hides
  // the 2AM hour that gets skipped over, so the number of slots does match the
  // number of hours in the day.
  const dayStart = dates.startOf(time, 'day');
  const dayEnd = dates.endOf(time, 'day');
  const daylightSavingsShift =
    dayStart.getTimezoneOffset() - dayEnd.getTimezoneOffset();
  const isFallingBack = daylightSavingsShift < 0;
  if (isFallingBack && time.getTimezoneOffset() !== dayStart.getTimezoneOffset()) {
    time = dates.add(time, daylightSavingsShift, 'minutes');
  }

  // Handling long range events. Though long range events have a condition that
  // start and end times are less than 24 hours apart, we don't perform that check
  // here. That should already be handled at the TimeGrid/MultiTimeGrid level, and
  // any events that are 24+ hours long will be filtered into the "all day" section
  // of the calendar, not the "range events" section, so they shouldn't reach this
  // function.
  if (isEndAccessor) {
    // handling the front end of long range events:
    // if the end time is the day after `min`, use the end of day of `min` as the end time.
    if (dates.isDayAfter(min, time)) {
      time = new Date(min);
      time.setHours(23);
      time.setMinutes(59);
    }
  } else {
    // handling the back end of long range events:
    // if the start time is the day before `min`, use `min` as the start time
    if (dates.isDayBefore(min, time)) {
      time = new Date(min);
    }
  }
  return event && positionFromDate(time, min, totalMin);
}

/**
 * Two events are considered siblings if the difference between their
 * start time is less than 5 minutes (used to be 1 hour).
 */
let isSibling = (idx1, idx2, { events, startAccessor, min, totalMin }) => {
  let event1 = events[idx1]
  let event2 = events[idx2]

  if (!event1 || !event2) return false

  let start1 = getSlot(event1, startAccessor, min, totalMin)
  let start2 = getSlot(event2, startAccessor, min, totalMin)

  return (Math.abs(start1 - start2) < 5)
}

/**
 * An event is considered a child of another event if its start time is
 * more than 1 hour later than the other event's start time,
 * but before its end time.
 */
let isChild = (parentIdx, childIdx, {
  events, startAccessor, endAccessor, min, totalMin
}) => {
  if (isSibling(
    parentIdx, childIdx,
    { events, startAccessor, endAccessor, min, totalMin }
  )) return false

  let parentEnd = getSlot(events[parentIdx], endAccessor, min, totalMin, true)
  let childStart = getSlot(events[childIdx], startAccessor, min, totalMin)

  return parentEnd > childStart
}

/**
 * Given an event index, siblings directly following it will be found and
 * returned as an array of indexes.
 */
let getSiblings = (idx, {
  events, startAccessor, endAccessor, min, totalMin
}) => {
  let nextIdx = idx
  let siblings = []

  while (isSibling(
    idx, ++nextIdx, { events, startAccessor, endAccessor, min, totalMin })
  ) {
    siblings.push(nextIdx)
  }

  return siblings
}

/**
 * Given an event index, and a start search position, all child events to that
 * event will be found and placed into groups of siblings.
 * The return value is an array of child group arrays, as well as the largest
 * size of the child groups.
 */
let getChildGroups = (idx, nextIdx, {
  events, startAccessor, endAccessor, min, totalMin
}) => {
  let groups = []
  let nbrOfColumns = 0

  while (isChild(
    idx, nextIdx,
    { events, startAccessor, endAccessor, min, totalMin }
  )) {
    let childGroup = [nextIdx]
    let siblingIdx = nextIdx

    while (isSibling(
      nextIdx, ++siblingIdx,
      { events, startAccessor, endAccessor, min, totalMin }
    )) {
      childGroup.push(siblingIdx)
    }

    nbrOfColumns = Math.max(nbrOfColumns, childGroup.length)
    groups.push(childGroup)
    nextIdx = siblingIdx
  }

  return { childGroups: groups, nbrOfChildColumns: nbrOfColumns }
}

/**
 * Returns height and top offset, both in percentage, for an event at
 * the specified index.
 */
let getYStyles = (idx, {
  events, startAccessor, endAccessor, min, totalMin, step
}) => {
  let event = events[idx]
  let start = getSlot(event, startAccessor, min, totalMin)
  let end = Math.max(getSlot(event, endAccessor, min, totalMin, true), start + step)

  let top = (start / totalMin) * 100;
  let bottom = (end / totalMin) * 100;

  return {
    top,
    height: bottom - top
  }
}

/**
 * Takes an array of unsorted events, and returns a sorted array
 * containing the same events, but with an additional style property.
 * These styles will position the events similarly to Google Calendar.
 *
 * The algorithm will start by sorting the array, and then iterating over it.
 * Starting at the first event, each of its siblings and children, placed in
 * groups of siblings, will be found. Both are needed in order to calculate the
 * width of the first event. When the width is known, its siblings will be
 * given the same width, but with an incremental x-offset.
 *
 * Each group of children will be looking to move as far away from its original
 * parent as possible. A move can be made to one of the parent's siblings, if
 * that sibling is also a parent to the child group. This will make room for
 * more events.
 *
 * When a child group knows its parent, it looks at the space occupied by that
 * parent, and calculates the remaning available space and divides that among
 * each other.
 *
 * All widths and x-offsets are calculated without taking overlapping into
 * account. Overlapping is added in the end according to the OVERLAP_MULTIPLIER.
 * If that is set to 0, the events won't overlap or grow.
 *
 * When one of these rounds are finished, all events connected have been
 * traversed, so the cursor will be moved past all of them.
 */
export default function getStyledEvents ({
  events: unsortedEvents, entityKeyAccessor, startAccessor, endAccessor, min, totalMin, step, rightOffset = 0
}) {
  let OVERLAP_MULTIPLIER = 0.3
  let events = sort(unsortedEvents, { startAccessor, endAccessor, entityKeyAccessor })
  let helperArgs = { events, startAccessor, endAccessor, min, totalMin, step }
  let styledEvents = []
  // idx of top-most, left-most event in each group of events
  let idx = 0

  // One iteration will cover all connected events.
  while (idx < events.length) {
    let siblings = getSiblings(idx, helperArgs);
    let { childGroups } = getChildGroups(
      idx, idx + siblings.length + 1, helperArgs
    );

    // Calculate number of columns based on top level events plus
    // any overlapping child events to ensure all events share
    // space equally
    let nbrOfColumns = siblings.length + 1;
    [idx, ...siblings].forEach((eventIdx, siblingIdx) => {
      childGroups.forEach(group => {
        if (isChild(eventIdx, group[0], helperArgs)) {
          // nbrOfColumns is the max of number of top level events plus
          // number of nested child events. Some top level events have more overlapping
          // child events than others.
          nbrOfColumns = Math.max(nbrOfColumns, group.length + siblingIdx + 1)
        }
      });
    });

    // Width of the top level events
    let width = (100 - rightOffset) / nbrOfColumns;

    // Calculate how much of the width need to be extended so that
    // the events can appear to be underneath each other, as opposed
    // to blocks that are stacked next to each other
    let xAdjustment = width * (nbrOfColumns > 1 ? OVERLAP_MULTIPLIER : 0);

    // Set styles to top level events.
    [idx, ...siblings].forEach((eventIdx, siblingIdx) => {
      let { top, height } = getYStyles(eventIdx, helperArgs);

      // Determines if this event is the last in the number of top
      // level events + their overlapping child events
      let isLastEvent = nbrOfColumns === siblingIdx + 1;

      styledEvents[eventIdx] = {
        event: events[eventIdx],
        style: {
          top,
          height,
          width: width + (isLastEvent ? 0: xAdjustment),
          xOffset: width * siblingIdx
        }
      }
    })

    childGroups.forEach(group => {
      let parentIdx = idx
      let siblingIdx = 0

      // Move child group to sibling if possible, since this will makes
      // room for more events.
      while (isChild(siblings[siblingIdx], group[0], helperArgs)) {
        parentIdx = siblings[siblingIdx]
        siblingIdx++
      }

      // Set styles to child events.
      group.forEach((eventIdx, i) => {
        let { style: parentStyle } = styledEvents[parentIdx]

        // Calculate space occupied by parent to know how much space the child groups
        // can occupy
        let spaceOccupiedByParent = parentStyle.width + parentStyle.xOffset - xAdjustment;

        // Calculate width of each child event
        let childColumns = Math.min(group.length, nbrOfColumns)
        let childWidth = (100 - rightOffset - spaceOccupiedByParent) / childColumns;

        // Adjust event width so they appear underneath others
        let childXAdjustment = i + 1 === group.length ? 0 : (childWidth * OVERLAP_MULTIPLIER);
        let { top, height } = getYStyles(eventIdx, helperArgs)

        styledEvents[eventIdx] = {
          event: events[eventIdx],
          style: {
            top,
            height,
            width: childWidth + childXAdjustment,
            xOffset: spaceOccupiedByParent + (childWidth * i),
          }
        }
      })
    })

    // Move past all events we just went through
    idx += 1 + siblings.length + childGroups.reduce(
      (total, group) => total + group.length, 0
    )
  }

  return styledEvents
}
