import { isSameMinute } from 'date-fns'

/**
 * Copied from the frontend's typeGuards file.
 * @param {unknown} value
 * @returns {value is []}
 */
function isEmptyArray(value) {
  return Array.isArray(value) && value.length === 0
}

/**
 * Copied from the frontend's typeGuards file.
 * @typedef {false | "" | 0 | null | undefined | void} Falsey
 * @param {unknown} value
 * @returns {value is [] | Falsey}
 */
function isEmptyArrayOrFalsey(value) {
  return !value || isEmptyArray(value)
}

/**
 * Copied from the frontend's arrayFunctions file.
 * @template {any} T
 * @param {T[]} arr
 * @param {(a: T, b: T) => number=} compareFn
 * @returns {T[]}
 */
function immutablySortArray(arr, compareFn) {
  // default to .toSorted() and .sort()
  try {
    if (isEmptyArrayOrFalsey(arr)) {
      return []
    }
    if (arr.toSorted) {
      return arr.toSorted(compareFn)
    } else {
      return [...arr].sort(compareFn)
    }
  } catch (error) {
    return arr ?? []
  }
}

/**
 * Everything below is copied from the frontend's rangeFunctions file.
 */

/**
 * @typedef {number | Date} Point
 */

/**
 * @typedef {"start" | "end"} ExtremaPosition
 */

/**
 * @template {Point} T
 * @typedef {{ start: T, end: T }} Range
 */

/**
 * @template {Point} T
 * @param {T} a
 * @param {T} b
 */
function arePointsEqual(a, b) {
  if (a instanceof Date) {
    return isSameMinute(a, b)
  } else {
    return a === b
  }
}

/**
 * @template {Point} T
 * @param {{ point: T, position: ExtremaPosition }} a
 * @param {{ point: T, position: ExtremaPosition }} b
 */
function extremaCompareFn(a, b) {
  if (a.point < b.point) {
    return -1
  } else if (a.point > b.point) {
    return 1
  } else if (a.position === 'end' && b.position === 'start') {
    return -1
  } else if (a.position === 'start' && b.position === 'end') {
    return 1
  } else {
    return 0
  }
}

/**
 * @template {Point} T
 * @param {Range<T>[]} ranges
 * @param {mergeAdjacent=} boolean
 * @returns {Range<T>[]}
 */
export function mergeRanges(ranges, mergeAdjacent = true) {
  /**
   * @type {{ point: T, position: "start" | "end" }[]}
   */
  const extrema = []
  ranges.forEach(range => {
    if (arePointsEqual(range.start, range.end)) {
      return
    }
    extrema.push({ point: range.start, position: 'start' })
    extrema.push({ point: range.end, position: 'end' })
  })
  const sortedExtrema = immutablySortArray(extrema, extremaCompareFn)

  /**
   * @type {{ start: T, end: T }[]}
   */
  const results = []
  /**
   * @type {{ start: T, end: T } | null}
   */
  let currentRange = null
  let nestedLevel = 0
  for (const { point, position } of sortedExtrema) {
    if (position === 'start') {
      nestedLevel += 1
      if (nestedLevel === 1) {
        if (
          mergeAdjacent &&
          currentRange &&
          arePointsEqual(currentRange.end, point)
        ) {
          // A range just closed and another one opened up on the same point.
          // No need to create a new range.
          continue
        }
        currentRange = { start: point, end: point }
        results.push(currentRange)
      }
    } else {
      nestedLevel -= 1
      if (currentRange) {
        currentRange.end = point
      }
    }

    if (nestedLevel < 0) {
      throw new Error('Ranges must not end before they start.')
    }
  }

  if (nestedLevel !== 0) {
    throw new Error('nestedLevel must be 0 after all ranges processed.')
  }

  return results
}
