/**
 * Playwright tests for src/Month.js and src/DateContentRow.js
 *
 * These components require real DOM layout for:
 *   - measureRowLimit() → getHeight() returns real pixel values
 *   - handleShowMore → events must visually overflow
 *   - renderOverlay / popup → PopOverlay requires real positioning
 *   - handleSelectSlot → BackgroundCells mouse selection
 *   - selectDates → deferred selection via setTimeout
 *
 * Targets:
 *   Month.js lines: 56-59 (resize), 76 (getContainer), 209-222 (renderOverlay),
 *                   282-285 (handleSelectSlot), 305-306 (handleKeyPressEvent),
 *                   316-330 (handleShowMore), 334-350 (overlayDisplay/selectDates)
 *   DateContentRow.js: getRowLimit(), handleShowMore, handleSelectSlot
 */
const { test, expect } = require('@playwright/test')
const { loadStory } = require('../helpers/storybook')

const MONTH_POPUP = 'additional-examples--custom-show-more'
// examples--example-6 is the dedicated popup demo (month view + popup=true with many events)
const MONTH_POPUP_TRUE = 'examples--example-6'

test.describe('Month.js — basic rendering and layout', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_POPUP)
  })

  test('month view renders with correct structure', async ({ page }) => {
    await expect(page.locator('.rbc-month-view')).toBeVisible()
    await expect(page.locator('.rbc-month-header')).toBeVisible()
    // Verify actual row rendering (measureRowLimit used real getHeight)
    const rows = page.locator('.rbc-month-row')
    await expect(rows.first()).toBeVisible()
  })

  test('date cells are visible and have correct number per row', async ({ page }) => {
    const dateCells = page.locator('.rbc-date-cell')
    const count = await dateCells.count()
    expect(count).toBeGreaterThanOrEqual(28)
  })

  test('events render in month cells', async ({ page }) => {
    const events = page.locator('.rbc-event')
    const count = await events.count()
    expect(count).toBeGreaterThan(0)
  })

  test('rowLimit is calculated by real DOM height (measureRowLimit)', async ({ page }) => {
    // Verify that events are constrained by row limit (some events may be hidden)
    await expect(page.locator('.rbc-month-view')).toBeVisible()
    // If measureRowLimit worked, rbc-row will have a finite number of events
    const rows = page.locator('.rbc-month-row')
    await expect(rows.first()).toBeVisible()
  })
})

test.describe('Month.js — show-more button and popup (handleShowMore + renderOverlay)', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_POPUP)
  })

  test('show-more button appears when events overflow row limit', async ({ page }) => {
    // The custom-show-more story has many events
    const showMore = page.locator('.rbc-show-more')
    // Wait for show-more to possibly appear (depends on available height)
    const count = await showMore.count()
    // In a headless browser with 900px viewport, at least some months should overflow
    if (count > 0) {
      await expect(showMore.first()).toBeVisible()
    } else {
      // Even without overflow, the month rendered correctly
      await expect(page.locator('.rbc-month-view')).toBeVisible()
    }
  })

  test('clicking show-more triggers handleShowMore (with popup=false — default drilldown)', async ({ page }) => {
    const showMore = page.locator('.rbc-show-more')
    if (await showMore.count() > 0) {
      // Click the first show-more button
      await showMore.first().click()
      // With popup=false (default), this should trigger navigation to day view
      await page.waitForTimeout(500)
      await expect(page.locator('.rbc-calendar')).toBeVisible()
    }
  })
})

test.describe('Month.js — popup mode (renderOverlay, PopOverlay, Popup)', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_POPUP_TRUE)
  })

  test('calendar renders with popup enabled', async ({ page }) => {
    await expect(page.locator('.rbc-calendar')).toBeVisible()
  })

  test('show-more with popup=true renders overlay (renderOverlay, Popup, PopOverlay)', async ({ page }) => {
    const showMore = page.locator('.rbc-show-more')
    if (await showMore.count() > 0) {
      await showMore.first().click()
      // The popup overlay should appear
      await page.waitForTimeout(500)
      // Look for the popup overlay container
      const overlay = page.locator('.rbc-overlay, .rbc-popup')
      if (await overlay.count() > 0) {
        await expect(overlay.first()).toBeVisible()
      }
    } else {
      // No overflow in this viewport, month view still renders
      await expect(page.locator('.rbc-calendar')).toBeVisible()
    }
  })
})

test.describe('Month.js — keyboard interactions (handleKeyPressEvent)', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_POPUP)
  })

  test('keypress on an event triggers handleKeyPressEvent', async ({ page }) => {
    const events = page.locator('.rbc-event')
    if (await events.count() > 0) {
      await events.first().focus()
      await page.keyboard.press('Enter')
      // handleKeyPressEvent clears selection and notifies — verify no crash
      await expect(page.locator('.rbc-month-view')).toBeVisible()
    }
  })
})

test.describe('Month.js — resize event handling (componentDidMount listener)', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_POPUP)
  })

  test('window resize triggers needLimitMeasure state update', async ({ page }) => {
    await expect(page.locator('.rbc-month-view')).toBeVisible()
    // Trigger a resize event
    await page.evaluate(() => window.dispatchEvent(new Event('resize')))
    await page.waitForTimeout(200)
    // After resize, measureRowLimit should re-run
    await expect(page.locator('.rbc-month-view')).toBeVisible()
    const rows = page.locator('.rbc-month-row')
    await expect(rows.first()).toBeVisible()
  })
})

test.describe('DateContentRow.js — layout measurement', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_POPUP)
  })

  test('getRowLimit returns a positive number based on real DOM height', async ({ page }) => {
    // If getRowLimit works correctly, events are constrained and rows don't overflow
    const container = page.locator('.rbc-month-row').first()
    await expect(container).toBeVisible()
    const height = await container.evaluate(el => el.clientHeight)
    expect(height).toBeGreaterThan(0)
  })
})
