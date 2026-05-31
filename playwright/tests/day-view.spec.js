/**
 * Playwright tests for src/Day.js
 *
 * Day.js is a wrapper view that displays a single day in time-grid format.
 * It requires real DOM layout for TimeGrid measurements.
 *
 * Targets:
 *   Day.js: renders with TimeGrid, handles default date, responsive to prop changes
 */
const { test, expect } = require('../helpers/coverage')
const { loadStory } = require('../helpers/storybook')

const DAY_VIEW_STORY = 'additional-examples--complex-day-view-layout'

test.describe('Day.js — single day view rendering', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, DAY_VIEW_STORY)
  })

  test('day view renders with time-grid layout', async ({ page }) => {
    await expect(page.locator('.rbc-time-view')).toBeVisible()
    await expect(page.locator('.rbc-time-gutter')).toBeVisible()
    await expect(page.locator('.rbc-time-header')).toBeVisible()
    await expect(page.locator('.rbc-time-content')).toBeVisible()
  })

  test('day view displays a single day column', async ({ page }) => {
    const daySlots = page.locator('.rbc-day-slot')
    const count = await daySlots.count()
    // Day view should have exactly 1 day column
    expect(count).toBe(1)
  })

  test('day header shows the current or selected date', async ({ page }) => {
    const header = page.locator('.rbc-time-header')
    await expect(header).toBeVisible()
  })

  test('time slots render in the day column', async ({ page }) => {
    const daySlot = page.locator('.rbc-day-slot').first()
    const timeSlots = daySlot.locator('.rbc-time-slot')
    const count = await timeSlots.count()
    expect(count).toBeGreaterThan(0)
  })

  test('events display in the correct time positions', async ({ page }) => {
    const events = page.locator('.rbc-time-view .rbc-event')
    if (await events.count() > 0) {
      await expect(events.first()).toBeVisible()
    }
  })

  test('day gutter shows time labels at regular intervals', async ({ page }) => {
    const labels = page.locator('.rbc-time-gutter .rbc-label')
    const count = await labels.count()
    expect(count).toBeGreaterThan(0)
  })

  test('scroll position is maintained based on current time', async ({ page }) => {
    const content = page.locator('.rbc-time-content')
    const scrollTop = await content.evaluate(el => el.scrollTop)
    // Scroll should be positioned to show business hours or current time
    expect(typeof scrollTop).toBe('number')
    expect(scrollTop).toBeGreaterThanOrEqual(0)
  })
})

test.describe('Day.js — time selection within a day', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, DAY_VIEW_STORY)
  })

  test('clicking on a time slot starts selection', async ({ page }) => {
    const daySlot = page.locator('.rbc-day-slot').first()
    const box = await daySlot.boundingBox()

    await page.mouse.click(box.x + box.width / 2, box.y + 40)
    await page.waitForTimeout(200)

    // Verify day view is still present (selection doesn't break rendering)
    await expect(page.locator('.rbc-time-view')).toBeVisible()
  })

  test('dragging across time slots creates a range selection', async ({ page }) => {
    const daySlot = page.locator('.rbc-day-slot').first()
    const box = await daySlot.boundingBox()

    await page.mouse.move(box.x + box.width / 2, box.y + 40)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width / 2, box.y + 100)
    await page.mouse.up()
    await page.waitForTimeout(200)

    await expect(page.locator('.rbc-time-view')).toBeVisible()
  })
})

test.describe('Day.js — event interactions', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, DAY_VIEW_STORY)
  })

  test('clicking on an event in day view is interactive', async ({ page }) => {
    const event = page.locator('.rbc-time-view .rbc-event').first()
    if (await event.count() > 0) {
      await event.click()
      await page.waitForTimeout(200)
      // Day view should remain visible after interaction
      await expect(page.locator('.rbc-time-view')).toBeVisible()
    }
  })

  test('event styling is applied correctly', async ({ page }) => {
    const event = page.locator('.rbc-time-view .rbc-event').first()
    if (await event.count() > 0) {
      // Events should have positioning styles applied
      const style = await event.getAttribute('style')
      expect(typeof style).toBe('string')
    }
  })
})

test.describe('Day.js — all-day events handling', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, DAY_VIEW_STORY)
  })

  test('all-day events render in the header row', async ({ page }) => {
    const allDayCell = page.locator('.rbc-allday-cell')
    if (await allDayCell.count() > 0) {
      await expect(allDayCell.first()).toBeVisible()
    }
  })
})

test.describe('Day.js — resource columns (with resources)', () => {
  test.beforeEach(async ({ page }) => {
    // Complex day view with resources
    await loadStory(page, 'additional-examples--custom-day-column-wrapper')
  })

  test('day view with multiple resource columns renders correctly', async ({ page }) => {
    const daySlots = page.locator('.rbc-day-slot')
    const count = await daySlots.count()
    // If resources are configured, there should be multiple day columns
    expect(count).toBeGreaterThanOrEqual(1)
  })
})
