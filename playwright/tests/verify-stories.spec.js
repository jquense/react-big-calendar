/**
 * Smoke test that verifies story IDs load a calendar correctly.
 * Run this first to confirm IDs before writing full tests.
 */
const { test, expect } = require('../helpers/coverage')

const STORIES = [
  'additional-examples--complex-day-view-layout',
  'additional-examples-timeslots--selectable-step-15-x-4-slot',
  'additional-examples-drag-and-drop--draggable-and-resizable',
  'additional-examples--custom-show-more',
  'additional-examples--custom-time-gutter-header',
  'additional-examples-layout--event-layout',
  'additional-examples-drag-and-drop--draggable-multiple-resources',
]

for (const storyId of STORIES) {
  test(`story loads: ${storyId}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${storyId}&viewMode=story`)
    await expect(page.locator('.rbc-calendar')).toBeVisible({ timeout: 15000 })
  })
}
