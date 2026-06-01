/**
 * Shared helpers for Playwright tests against Storybook.
 *
 * Storybook 6 story IDs are generated as:
 *   kebab(title) + '--' + kebab(storyName)
 *
 * e.g. title='Additional Examples', story='ComplexDayViewLayout'
 *      → 'additional-examples--complex-day-view-layout'
 *
 * For hierarchical titles separated by '/':
 *   title='Additional Examples/Timeslots', story='SelectableStep15x4Slot'
 *   → 'additional-examples-timeslots--selectable-step15x4-slot'
 *
 * Use Storybook's index to verify IDs: http://localhost:9002/index.json
 */

/**
 * Navigate to a story via its iframe URL.
 * Using the iframe bypasses Storybook's UI chrome for a clean DOM.
 * @param {import('@playwright/test').Page} page
 * @param {string} storyId - the full Storybook story ID
 */
async function gotoStory(page, storyId) {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`)
}

/**
 * Wait for the calendar root to be visible.
 * @param {import('@playwright/test').Page} page
 */
async function waitForCalendar(page) {
  await page.waitForSelector('.rbc-calendar', { state: 'visible', timeout: 15_000 })
}

/**
 * Navigate to a story and wait for the calendar to render.
 * @param {import('@playwright/test').Page} page
 * @param {string} storyId
 */
async function loadStory(page, storyId) {
  await gotoStory(page, storyId)
  await waitForCalendar(page)
}

/**
 * Get the bounding rect of a locator (requires the element to be visible).
 * @param {import('@playwright/test').Locator} locator
 */
async function getBbox(locator) {
  return locator.boundingBox()
}

/**
 * Drag from one point to another using mouse events.
 * More reliable than page.dragAndDrop() for custom DnD implementations.
 * @param {import('@playwright/test').Page} page
 * @param {{x: number, y: number}} from
 * @param {{x: number, y: number}} to
 */
async function dragFromTo(page, from, to) {
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  // Move in small steps to trigger mousemove events correctly
  const steps = 5
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(
      from.x + ((to.x - from.x) * i) / steps,
      from.y + ((to.y - from.y) * i) / steps,
      { steps: 2 }
    )
  }
  await page.mouse.up()
}

module.exports = { gotoStory, waitForCalendar, loadStory, getBbox, dragFromTo }
