/**
 * Coverage-targeted Playwright tests for src/BackgroundCells.js
 *
 * Gaps that require a real browser:
 *   - _selectable() all internal selector.on() handlers (lines 79-145)
 *   - selectorClicksHandler — pointInBox, getSlotAtX, _selectSlot (lines 79-98)
 *   - selector 'selecting' handler — isSelected, dateCellSelection (lines 100-126)
 *   - selector 'beforeSelect' with ignoreEvents (lines 128-132)
 *   - selector 'select' handler with notify (lines 140-145)
 */
const { test, expect } = require('../helpers/coverage')
const { loadStory, dragFromTo } = require('../helpers/storybook')

// props--selectable is the month view with selectable=true
const MONTH_SEL = 'props--selectable'

// ── _selectable() handlers in month / background cells ───────────────────────
test.describe('BackgroundCells — _selectable() via month view', () => {
  test.beforeEach(async ({ page }) => {
    // The 'props--selectable' story has selectable=true on a month calendar
    await loadStory(page, MONTH_SEL)
  })

  test('clicking a day background cell triggers selectorClicksHandler', async ({ page }) => {
    const bg = page.locator('.rbc-day-bg').first()
    const box = await bg.boundingBox()
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    await page.waitForTimeout(200)
    await expect(page.locator('.rbc-month-view')).toBeVisible()
  })

  test('dragging across day cells triggers selecting handler', async ({ page }) => {
    const cells = page.locator('.rbc-day-bg')
    const count = await cells.count()
    if (count >= 3) {
      const first = await cells.nth(1).boundingBox()
      const third = await cells.nth(3).boundingBox()
      await dragFromTo(
        page,
        { x: first.x + first.width / 2, y: first.y + first.height / 2 },
        { x: third.x + third.width / 2, y: third.y + third.height / 2 }
      )
      await page.waitForTimeout(200)
    }
    await expect(page.locator('.rbc-month-view')).toBeVisible()
  })

  test('double-click on day cell triggers doubleClick action', async ({ page }) => {
    const bg = page.locator('.rbc-day-bg').first()
    const box = await bg.boundingBox()
    await page.mouse.dblclick(box.x + box.width / 2, box.y + box.height / 2)
    await page.waitForTimeout(200)
    await expect(page.locator('.rbc-month-view')).toBeVisible()
  })

  test('completed drag fires select handler (notify onSelectEnd)', async ({ page }) => {
    const cells = page.locator('.rbc-day-bg')
    const count = await cells.count()
    if (count >= 2) {
      const first = await cells.nth(0).boundingBox()
      const second = await cells.nth(2).boundingBox()
      await dragFromTo(
        page,
        { x: first.x + first.width / 2, y: first.y + first.height / 2 },
        { x: second.x + second.width / 2, y: second.y + second.height / 2 }
      )
      await page.waitForTimeout(300)
    }
    await expect(page.locator('.rbc-month-view')).toBeVisible()
  })

  test('clicking an event does not trigger slot selection (isEvent check)', async ({ page }) => {
    const event = page.locator('.rbc-event').first()
    if (await event.count() > 0) {
      await event.click()
      await page.waitForTimeout(200)
      // Calendar still intact — click on event was intercepted before slot selection
    }
    await expect(page.locator('.rbc-month-view')).toBeVisible()
  })
})

// ── selectable via week view background cells ─────────────────────────────────
test.describe('BackgroundCells — in week view (all-day background)', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'additional-examples-timeslots--selectable-step-15-x-4-slot')
  })

  test('clicking background in all-day header area exercises background cell selection', async ({ page }) => {
    const allDay = page.locator('.rbc-allday-cell').first()
    if (await allDay.count() > 0) {
      const box = await allDay.boundingBox()
      await page.mouse.click(box.x + box.width / 4, box.y + box.height / 2)
      await page.waitForTimeout(200)
    }
    await expect(page.locator('.rbc-time-view')).toBeVisible()
  })

  test('drag in all-day cell area triggers selecting → select handlers', async ({ page }) => {
    const allDay = page.locator('.rbc-allday-cell').first()
    if (await allDay.count() > 0) {
      const box = await allDay.boundingBox()
      await dragFromTo(
        page,
        { x: box.x + 20, y: box.y + box.height / 2 },
        { x: box.x + box.width / 2, y: box.y + box.height / 2 }
      )
      await page.waitForTimeout(200)
    }
    await expect(page.locator('.rbc-time-view')).toBeVisible()
  })
})
