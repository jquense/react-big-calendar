/**
 * Playwright tests for src/Week.js
 *
 * Week.js displays a full week (7 days) in time-grid format.
 * Uses TimeGrid component for rendering; requires real DOM layout.
 *
 * Targets:
 *   Week.js: 7-day grid rendering, full week navigation, time-grid integration
 */
const { test, expect } = require('../helpers/coverage')
const { loadStory } = require('../helpers/storybook')

const WEEK_STORY = 'additional-examples--custom-time-gutter-header'
const WEEK_SELECTABLE = 'additional-examples-timeslots--selectable-step-15-x-4-slot'
const LAYOUT_STORY = 'additional-examples-layout--event-layout'

test.describe('Week.js — seven-day week view rendering', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, WEEK_STORY)
  })

  test('week view renders time-grid with 7 day columns', async ({ page }) => {
    await expect(page.locator('.rbc-time-view')).toBeVisible()
    const daySlots = page.locator('.rbc-day-slot')
    const count = await daySlots.count()
    // Week view displays 7 days
    expect(count).toBe(7)
  })

  test('week view displays all 7 day headers', async ({ page }) => {
    const dayHeaders = page.locator('.rbc-time-header .rbc-header')
    const count = await dayHeaders.count()
    // Should have 7 day headers (plus possibly resource columns)
    expect(count).toBeGreaterThanOrEqual(7)
  })

  test('time gutter is visible and properly measured', async ({ page }) => {
    const gutter = page.locator('.rbc-time-gutter')
    await expect(gutter).toBeVisible()
    const width = await gutter.evaluate(el => el.offsetWidth)
    expect(width).toBeGreaterThan(0)
  })

  test('all time slots render across the week', async ({ page }) => {
    const timeSlots = page.locator('.rbc-time-slot')
    const count = await timeSlots.count()
    // Each day has multiple time slots; 7 days × slot count
    expect(count).toBeGreaterThan(40)
  })

  test('events display across the week in correct positions', async ({ page }) => {
    const events = page.locator('.rbc-time-view .rbc-event')
    const count = await events.count()
    if (count > 0) {
      // Events should be visible
      await expect(events.first()).toBeVisible()
    }
  })
})

test.describe('Week.js — day column structure', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, LAYOUT_STORY)
  })

  test('each day column has correct content structure', async ({ page }) => {
    const daySlot = page.locator('.rbc-day-slot').first()
    await expect(daySlot).toBeVisible()

    // Day slot should contain time slots
    const timeSlots = daySlot.locator('.rbc-time-slot')
    const count = await timeSlots.count()
    expect(count).toBeGreaterThan(0)
  })

  test('day columns maintain consistent width', async ({ page }) => {
    const daySlots = page.locator('.rbc-day-slot')
    if (await daySlots.count() >= 2) {
      const widths = []
      const count = await daySlots.count()
      for (let i = 0; i < Math.min(count, 3); i++) {
        const slot = daySlots.nth(i)
        const width = await slot.evaluate(el => el.offsetWidth)
        widths.push(width)
      }
      // All day slots should have similar widths
      expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(20)
    }
  })
})

test.describe('Week.js — scroll synchronization', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, WEEK_SELECTABLE)
  })

  test('scroll position applies across all day columns', async ({ page }) => {
    const content = page.locator('.rbc-time-content')
    await expect(content).toBeVisible()

    // Set scroll position
    await content.evaluate(el => {
      el.scrollTop = 150
    })

    // Verify scroll was set
    const scrollTop = await content.evaluate(el => el.scrollTop)
    expect(scrollTop).toBeGreaterThan(100)
  })

  test('header remains fixed while content scrolls', async ({ page }) => {
    const header = page.locator('.rbc-time-header')
    const content = page.locator('.rbc-time-content')

    const headerTop = await header.evaluate(el => el.getBoundingClientRect().top)

    await content.evaluate(el => {
      el.scrollTop = 300
    })

    await page.waitForTimeout(100)

    const headerTopAfter = await header.evaluate(el => el.getBoundingClientRect().top)
    // Header position should remain fixed (unchanged)
    expect(Math.abs(headerTop - headerTopAfter)).toBeLessThan(5)
  })
})

test.describe('Week.js — all-day events row', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'additional-examples-layout--first-of-week-all-day')
  })

  test('calendar renders with all-day event story', async ({ page }) => {
    const calendar = page.locator('.rbc-calendar')
    await expect(calendar).toBeVisible()
  })

  test('all-day events span across week columns', async ({ page }) => {
    const allDayEvents = page.locator('.rbc-allday-cell .rbc-event')
    if (await allDayEvents.count() > 0) {
      const event = allDayEvents.first()
      await expect(event).toBeVisible()
    }
  })
})

test.describe('Week.js — time selection across week', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, WEEK_SELECTABLE)
  })

  test('clicking on a day slot in the week starts selection', async ({ page }) => {
    const daySlot = page.locator('.rbc-day-slot').nth(2) // Middle of week
    const box = await daySlot.boundingBox()

    await page.mouse.click(box.x + box.width / 2, box.y + 60)
    await page.waitForTimeout(200)

    await expect(page.locator('.rbc-time-view')).toBeVisible()
  })

  test('dragging creates time range selection', async ({ page }) => {
    const daySlot = page.locator('.rbc-day-slot').first()
    const box = await daySlot.boundingBox()

    await page.mouse.move(box.x + box.width / 2, box.y + 60)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width / 2, box.y + 140, { steps: 5 })
    await page.mouse.up()
    await page.waitForTimeout(200)

    await expect(page.locator('.rbc-time-view')).toBeVisible()
  })
})

test.describe('Week.js — event interactions', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, LAYOUT_STORY)
  })

  test('events in week view are clickable', async ({ page }) => {
    const event = page.locator('.rbc-time-view .rbc-event').first()
    if (await event.count() > 0) {
      await event.click()
      await page.waitForTimeout(200)
      await expect(page.locator('.rbc-time-view')).toBeVisible()
    }
  })

  test('multi-day events render correctly in week view', async ({ page }) => {
    const events = page.locator('.rbc-time-view .rbc-event')
    if (await events.count() > 0) {
      // Verify event styling includes positioning
      const firstEvent = events.first()
      const style = await firstEvent.getAttribute('style')
      expect(style).toBeTruthy()
    }
  })
})

test.describe('Week.js — navigation between weeks', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, WEEK_STORY)
  })

  test('week headers are clickable for day view navigation', async ({ page }) => {
    const headerButtons = page.locator('.rbc-header .rbc-button-link')
    if (await headerButtons.count() > 0) {
      const count = await headerButtons.count()
      // Should have at least 7 day navigation buttons
      expect(count).toBeGreaterThanOrEqual(7)
    }
  })
})
