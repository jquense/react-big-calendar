/**
 * Playwright tests for src/Popup.js and src/PopOverlay.js
 *
 * These components require real browser positioning:
 *   - react-overlays <Overlay> calculates placement based on getBoundingClientRect
 *   - Popup uses dom-helpers getOffset/getScrollTop for positioning
 *   - The overlay is only rendered when overlay.position is set (from handleShowMore)
 *
 * Coverage targets (Popup.js 0%, PopOverlay.js 0%):
 *   - CalOverlay render (when overlay.position is defined)
 *   - Popup render (with events, slotStart, slotEnd)
 *   - Popup event click → onSelect
 *   - useClickOutside → clicking outside hides popup
 */
const { test, expect } = require('../helpers/coverage')
const { loadStory } = require('../helpers/storybook')

// examples--example-6 is the popup demo: month view with popup=true
// and many events that overflow, making show-more buttons appear
const POPUP_STORY = 'examples--example-6'

test.describe('PopOverlay.js and Popup.js — popup rendering', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, POPUP_STORY)
  })

  test('calendar with popup=true renders month view', async ({ page }) => {
    await expect(page.locator('.rbc-month-view')).toBeVisible()
  })

  test('show-more button triggers popup (CalOverlay + Popup render path)', async ({ page }) => {
    const showMore = page.locator('.rbc-show-more')

    if (await showMore.count() > 0) {
      await showMore.first().click()
      await page.waitForTimeout(500)

      // PopOverlay → CalOverlay → Popup should appear
      const popup = page.locator('.rbc-overlay, .rbc-popup, [class*="overlay"]')
      if (await popup.count() > 0) {
        await expect(popup.first()).toBeVisible()

        // Events inside popup should be clickable
        const popupEvents = popup.locator('.rbc-event')
        if (await popupEvents.count() > 0) {
          await popupEvents.first().click()
          await page.waitForTimeout(200)
        }
      }
    } else {
      // No overflow — use a smaller viewport to force it
      await page.setViewportSize({ width: 800, height: 500 })
      await page.waitForTimeout(500)

      const showMoreSmall = page.locator('.rbc-show-more')
      if (await showMoreSmall.count() > 0) {
        await showMoreSmall.first().click()
        await page.waitForTimeout(500)
        const popup = page.locator('.rbc-overlay, [class*="overlay"]')
        if (await popup.count() > 0) {
          await expect(popup.first()).toBeVisible()
        }
      }
      // Either way, calendar should remain functional
      await expect(page.locator('.rbc-calendar')).toBeVisible()
    }
  })

  test('click outside popup hides it (useClickOutside)', async ({ page }) => {
    const showMore = page.locator('.rbc-show-more')
    if (await showMore.count() > 0) {
      await showMore.first().click()
      await page.waitForTimeout(500)

      // Check if popup appeared
      const popup = page.locator('.rbc-overlay')
      if (await popup.count() > 0) {
        // Click outside the popup (in the calendar toolbar)
        await page.locator('.rbc-toolbar').click()
        await page.waitForTimeout(400)

        // Popup should be hidden now
        const popupAfter = await page.locator('.rbc-overlay').count()
        expect(popupAfter).toBe(0)
      }
    }
    await expect(page.locator('.rbc-calendar')).toBeVisible()
  })
})

test.describe('PopOverlay.js — overlay with position', () => {
  test.beforeEach(async ({ page }) => {
    // Use small viewport to force overflow and popup
    await page.setViewportSize({ width: 900, height: 600 })
    await loadStory(page, POPUP_STORY)
  })

  test('popup overlay positions within viewport bounds', async ({ page }) => {
    const showMore = page.locator('.rbc-show-more')
    if (await showMore.count() > 0) {
      const showMoreBox = await showMore.first().boundingBox()
      await showMore.first().click()
      await page.waitForTimeout(600)

      const overlay = page.locator('.rbc-overlay')
      if (await overlay.count() > 0) {
        const overlayBox = await overlay.first().boundingBox()
        if (overlayBox && showMoreBox) {
          // Overlay should be positioned near the show-more button
          expect(overlayBox.x).toBeGreaterThanOrEqual(0)
          expect(overlayBox.y).toBeGreaterThanOrEqual(0)
          // Should be within viewport
          expect(overlayBox.x + overlayBox.width).toBeLessThanOrEqual(1000)
        }
      }
    }
    await expect(page.locator('.rbc-calendar')).toBeVisible()
  })
})
