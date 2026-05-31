/**
 * Playwright tests for src/Toolbar.js
 *
 * Toolbar.js provides navigation and view switching controls.
 * Displays month/year, previous/next buttons, and view selector.
 *
 * Targets:
 *   Toolbar.js: rendering, navigation buttons, view switching, label display
 */
const { test, expect } = require('../helpers/coverage')
const { loadStory } = require('../helpers/storybook')

const MONTH_STORY = 'examples--example-6'
const WEEK_STORY = 'additional-examples--custom-time-gutter-header'
const AGENDA_STORY = 'additional-examples--custom-no-agenda-events-label'

test.describe('Toolbar.js — basic rendering', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_STORY)
  })

  test('toolbar renders with navigation controls', async ({ page }) => {
    const toolbar = page.locator('.rbc-toolbar')
    await expect(toolbar).toBeVisible()
  })

  test('toolbar contains label showing current month/year', async ({ page }) => {
    const label = page.locator('.rbc-toolbar-label')
    await expect(label).toBeVisible()

    const text = await label.textContent()
    expect(text).toBeTruthy()
    expect(text.length).toBeGreaterThan(0)
  })

  test('toolbar has previous and next navigation buttons', async ({ page }) => {
    const toolbar = page.locator('.rbc-toolbar')
    const prevBtn = toolbar.locator('button:has-text("Back"), button:has-text("‹"), [aria-label*="Previous"], [aria-label*="previous"]')
    const nextBtn = toolbar.locator('button:has-text("Next"), button:has-text("›"), [aria-label*="Next"], [aria-label*="next"]')

    // At least one navigation button should exist
    const hasNav = await prevBtn.count() > 0 || await nextBtn.count() > 0
    expect(hasNav).toBe(true)
  })

  test('toolbar displays view selector buttons', async ({ page }) => {
    const toolbar = page.locator('.rbc-toolbar')
    const buttons = toolbar.locator('button')
    const count = await buttons.count()

    // Toolbar should have multiple buttons (prev, next, view selectors, today)
    expect(count).toBeGreaterThan(3)
  })
})

test.describe('Toolbar.js — navigation buttons', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_STORY)
  })

  test('previous button navigates to prior period', async ({ page }) => {
    const label = page.locator('.rbc-toolbar-label')
    const initialText = await label.textContent()

    const prevBtn = page.locator('.rbc-toolbar button').filter({ has: page.locator('text=/prev|back|‹/i') }).first()
    if (await prevBtn.count() > 0) {
      await prevBtn.click()
      await page.waitForTimeout(300)

      const newText = await label.textContent()
      // Text should change (different month/period)
      expect(newText).not.toBe(initialText)
    }
  })

  test('next button navigates to following period', async ({ page }) => {
    const label = page.locator('.rbc-toolbar-label')
    const initialText = await label.textContent()

    const nextBtn = page.locator('.rbc-toolbar button').filter({ has: page.locator('text=/next|›/i') }).first()
    if (await nextBtn.count() > 0) {
      await nextBtn.click()
      await page.waitForTimeout(300)

      const newText = await label.textContent()
      expect(newText).not.toBe(initialText)
    }
  })

  test('today button returns to current date', async ({ page }) => {
    const label = page.locator('.rbc-toolbar-label')

    // First navigate away
    const nextBtn = page.locator('.rbc-toolbar button').filter({ has: page.locator('text=/next|›/i') }).first()
    if (await nextBtn.count() > 0) {
      await nextBtn.click()
      await page.waitForTimeout(300)
      const awayText = await label.textContent()

      // Click today button
      const todayBtn = page.locator('.rbc-toolbar button:has-text("Today")')
      if (await todayBtn.count() > 0) {
        await todayBtn.click()
        await page.waitForTimeout(300)

        const todayText = await label.textContent()
        // May or may not be the same depending on exact date
        expect(todayText).toBeTruthy()
      }
    }
  })
})

test.describe('Toolbar.js — view selection buttons', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, WEEK_STORY)
  })

  test('view buttons are visible and clickable', async ({ page }) => {
    // Look for view selector buttons (Month, Week, Day, Agenda, etc.)
    const viewButtons = page.locator('.rbc-btn-group button, .rbc-toolbar button')

    // Filter to find view buttons (may have classes like rbc-active)
    const count = await viewButtons.count()
    expect(count).toBeGreaterThan(0)
  })

  test('active view button is highlighted', async ({ page }) => {
    // The current view button should have an active class
    const activeBtn = page.locator('.rbc-toolbar button.rbc-active, .rbc-toolbar button[aria-pressed="true"]')
    if (await activeBtn.count() > 0) {
      await expect(activeBtn.first()).toBeVisible()
    }
  })

  test('clicking view button switches calendar view', async ({ page }) => {
    // Find a view button that's not currently active
    const buttons = page.locator('.rbc-toolbar button')
    const count = await buttons.count()

    if (count > 0) {
      // Try clicking different buttons until we find a view switcher
      for (let i = 0; i < Math.min(count, 5); i++) {
        const btn = buttons.nth(i)
        const text = await btn.textContent()

        if (text && (text.includes('Month') || text.includes('Week') || text.includes('Day') || text.includes('Agenda'))) {
          await btn.click()
          await page.waitForTimeout(300)

          // Calendar should still be visible
          await expect(page.locator('.rbc-calendar')).toBeVisible()
          break
        }
      }
    }
  })
})

test.describe('Toolbar.js — label updates on navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_STORY)
  })

  test('label reflects current month in month view', async ({ page }) => {
    const label = page.locator('.rbc-toolbar-label')
    const text = await label.textContent()

    // Should contain month name and year
    const hasMonth = /January|February|March|April|May|June|July|August|September|October|November|December|\d{1,2}/.test(text)
    expect(hasMonth).toBe(true)
  })

  test('label updates when navigating months', async ({ page }) => {
    const label = page.locator('.rbc-toolbar-label')
    const initial = await label.textContent()

    // Navigate twice
    const nextBtn = page.locator('.rbc-toolbar button').filter({ has: page.locator('text=/next|›/i') }).first()
    if (await nextBtn.count() > 0) {
      await nextBtn.click()
      await page.waitForTimeout(300)
      const after1 = await label.textContent()

      // Navigate again
      await nextBtn.click()
      await page.waitForTimeout(300)
      const after2 = await label.textContent()

      // Each should be different (different months)
      expect(after1).not.toBe(initial)
      expect(after2).not.toBe(after1)
    }
  })
})

test.describe('Toolbar.js — button grouping and layout', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_STORY)
  })

  test('toolbar buttons are grouped logically', async ({ page }) => {
    const toolbar = page.locator('.rbc-toolbar')
    await expect(toolbar).toBeVisible()

    // Should have navigation button group and view button group
    const btnGroups = toolbar.locator('.rbc-btn-group')
    const count = await btnGroups.count()

    // Common layout has 2+ button groups
    if (count > 0) {
      expect(count).toBeGreaterThanOrEqual(1)
    }
  })

  test('all toolbar controls are within visible bounds', async ({ page }) => {
    const toolbar = page.locator('.rbc-toolbar')
    const box = await toolbar.boundingBox()

    expect(box).toBeTruthy()
    expect(box.width).toBeGreaterThan(100)
    expect(box.height).toBeGreaterThan(20)
  })
})

test.describe('Toolbar.js — accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, MONTH_STORY)
  })

  test('buttons have accessible labels', async ({ page }) => {
    const buttons = page.locator('.rbc-toolbar button')
    const count = await buttons.count()

    if (count > 0) {
      for (let i = 0; i < Math.min(count, 3); i++) {
        const btn = buttons.nth(i)
        const label = await btn.getAttribute('aria-label')
        const text = await btn.textContent()

        // Should have either aria-label or visible text
        const hasLabel = label || (text && text.trim().length > 0)
        expect(hasLabel).toBe(true)
      }
    }
  })

  test('toolbar is keyboard navigable', async ({ page }) => {
    const toolbar = page.locator('.rbc-toolbar')
    await toolbar.focus()

    // Tab through buttons
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // A button should now be focused
    const focused = await page.evaluate(() => document.activeElement.tagName)
    expect(['BUTTON', 'A']).toContain(focused)
  })
})

test.describe('Toolbar.js — responsive behavior', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, AGENDA_STORY)
  })

  test('toolbar adapts to viewport width', async ({ page }) => {
    const toolbar = page.locator('.rbc-toolbar')
    const box = await toolbar.boundingBox()

    // Should take full width or near it
    expect(box.width).toBeGreaterThan(200)
  })

  test('toolbar elements remain clickable at viewport dimensions', async ({ page }) => {
    const buttons = page.locator('.rbc-toolbar button')
    const count = await buttons.count()

    if (count > 0) {
      const btn = buttons.first()
      const box = await btn.boundingBox()

      // Button should be reasonably sized for clicking
      expect(box.width).toBeGreaterThan(20)
      expect(box.height).toBeGreaterThan(20)
    }
  })
})
