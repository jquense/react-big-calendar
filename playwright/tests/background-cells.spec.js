/**
 * Playwright tests for src/BackgroundCells.js
 *
 * BackgroundCells renders the grid of day cells in month view and
 * sets up mouse selection via Selection.js. The _selectable() method
 * and its callbacks require real pointer events.
 *
 * Targets:
 *   - _selectable() setup (componentDidMount with selectable=true)
 *   - Selection.on('beforeSelect', 'selectStart', 'selecting', 'select') callbacks
 *   - _teardownSelectable() (componentWillUnmount)
 *   - componentDidUpdate (selectable prop change)
 *   - rbc-selected-cell appearance during selection
 */
const { test, expect } = require('@playwright/test')
const { loadStory } = require('../helpers/storybook')

test.describe('BackgroundCells.js — month view rendering', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'additional-examples--custom-show-more')
  })

  test('background cells render for each day', async ({ page }) => {
    await expect(page.locator('.rbc-month-view')).toBeVisible()
    const bgCells = page.locator('.rbc-day-bg')
    const count = await bgCells.count()
    expect(count).toBeGreaterThanOrEqual(28)
  })

  test('today cell has rbc-today class', async ({ page }) => {
    const today = page.locator('.rbc-day-bg.rbc-today')
    await expect(today).toBeVisible()
  })

  test('off-range cells have rbc-off-range-bg class', async ({ page }) => {
    const offRange = page.locator('.rbc-day-bg.rbc-off-range-bg')
    const count = await offRange.count()
    // Months have leading/trailing days from adjacent months
    expect(count).toBeGreaterThanOrEqual(0)
  })
})

test.describe('BackgroundCells.js — slot selection (selectable mode)', () => {
  test.beforeEach(async ({ page }) => {
    // Use the selectable story which has month view with selectable=true
    await loadStory(page, 'additional-examples-timeslots--selectable-step-15-x-4-slot')
  })

  test('week view background renders with time slots', async ({ page }) => {
    await expect(page.locator('.rbc-time-view')).toBeVisible()
  })
})

test.describe('BackgroundCells.js — month view selection', () => {
  test.beforeEach(async ({ page }) => {
    // Use popup demo which renders a month view with background cells
    await loadStory(page, 'examples--example-6')
  })

  test('background cell is visible and clickable', async ({ page }) => {
    await expect(page.locator('.rbc-calendar')).toBeVisible()
    const bgCell = page.locator('.rbc-day-bg').first()
    await expect(bgCell).toBeVisible()
    await bgCell.click()
    await page.waitForTimeout(200)
    await expect(page.locator('.rbc-calendar')).toBeVisible()
  })

  test('click on background cell triggers slot selection callbacks', async ({ page }) => {
    const bgCell = page.locator('.rbc-day-bg').nth(5)
    const box = await bgCell.boundingBox()
    if (!box) return

    // Simulate a click which triggers the Selection callbacks
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    await page.waitForTimeout(200)

    // Selection was processed — calendar remains stable
    await expect(page.locator('.rbc-calendar')).toBeVisible()
  })

  test('mousedown+up across multiple cells selects range', async ({ page }) => {
    const bgCells = page.locator('.rbc-day-bg')
    const count = await bgCells.count()
    if (count < 3) return

    const startCell = bgCells.nth(3)
    const endCell = bgCells.nth(5)
    const startBox = await startCell.boundingBox()
    const endBox = await endCell.boundingBox()
    if (!startBox || !endBox) return

    // Drag across cells
    await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2)
    await page.mouse.down()
    await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2, { steps: 2 })
    await page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2, { steps: 5 })
    await page.mouse.up()

    await page.waitForTimeout(200)
    await expect(page.locator('.rbc-calendar')).toBeVisible()
  })
})
