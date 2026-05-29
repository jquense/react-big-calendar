# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: popup-overlay.spec.js >> PopOverlay.js and Popup.js — popup rendering >> calendar with popup=true renders month view
- Location: playwright/tests/popup-overlay.spec.js:26:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.rbc-month-view')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('.rbc-month-view')

```

```yaml
- button "Today"
- button "Back"
- button "Next"
- text: March 29 – April 04
- button "Week"
- button "Day"
- paragraph: Custom gutter text
- button "29 Sun":
    - columnheader "29 Sun"
- button "30 Mon":
    - columnheader "30 Mon"
- button "31 Tue":
    - columnheader "31 Tue"
- button "01 Wed":
    - columnheader "01 Wed"
- button "02 Thu":
    - columnheader "02 Thu"
- button "03 Fri":
    - columnheader "03 Fri"
- button "04 Sat":
    - columnheader "04 Sat"
- rowgroup:
    - row
- text: 12:00 AM 1:00 AM 2:00 AM 3:00 AM 4:00 AM 5:00 AM 6:00 AM 7:00 AM 8:00 AM 9:00 AM 10:00 AM 11:00 AM 12:00 PM 1:00 PM 2:00 PM 3:00 PM 4:00 PM 5:00 PM 6:00 PM 7:00 PM 8:00 PM 9:00 PM 10:00 PM 11:00 PM
```

# Test source

```ts
  1   | /**
  2   |  * Playwright tests for src/Popup.js and src/PopOverlay.js
  3   |  *
  4   |  * These components require real browser positioning:
  5   |  *   - react-overlays <Overlay> calculates placement based on getBoundingClientRect
  6   |  *   - Popup uses dom-helpers getOffset/getScrollTop for positioning
  7   |  *   - The overlay is only rendered when overlay.position is set (from handleShowMore)
  8   |  *
  9   |  * Coverage targets (Popup.js 0%, PopOverlay.js 0%):
  10  |  *   - CalOverlay render (when overlay.position is defined)
  11  |  *   - Popup render (with events, slotStart, slotEnd)
  12  |  *   - Popup event click → onSelect
  13  |  *   - useClickOutside → clicking outside hides popup
  14  |  */
  15  | const { test, expect } = require('@playwright/test')
  16  | const { loadStory } = require('../helpers/storybook')
  17  |
  18  | // The custom-time-gutter-header story has popup: true
  19  | const POPUP_STORY = 'additional-examples--custom-time-gutter-header'
  20  |
  21  | test.describe('PopOverlay.js and Popup.js — popup rendering', () => {
  22  |   test.beforeEach(async ({ page }) => {
  23  |     await loadStory(page, POPUP_STORY)
  24  |   })
  25  |
  26  |   test('calendar with popup=true renders month view', async ({ page }) => {
> 27  |     await expect(page.locator('.rbc-month-view')).toBeVisible()
      |                                                   ^ Error: expect(locator).toBeVisible() failed
  28  |   })
  29  |
  30  |   test('show-more button triggers popup (CalOverlay + Popup render path)', async ({ page }) => {
  31  |     const showMore = page.locator('.rbc-show-more')
  32  |
  33  |     if (await showMore.count() > 0) {
  34  |       await showMore.first().click()
  35  |       await page.waitForTimeout(500)
  36  |
  37  |       // PopOverlay → CalOverlay → Popup should appear
  38  |       const popup = page.locator('.rbc-overlay, .rbc-popup, [class*="overlay"]')
  39  |       if (await popup.count() > 0) {
  40  |         await expect(popup.first()).toBeVisible()
  41  |
  42  |         // Events inside popup should be clickable
  43  |         const popupEvents = popup.locator('.rbc-event')
  44  |         if (await popupEvents.count() > 0) {
  45  |           await popupEvents.first().click()
  46  |           await page.waitForTimeout(200)
  47  |         }
  48  |       }
  49  |     } else {
  50  |       // No overflow — use a smaller viewport to force it
  51  |       await page.setViewportSize({ width: 800, height: 500 })
  52  |       await page.waitForTimeout(500)
  53  |
  54  |       const showMoreSmall = page.locator('.rbc-show-more')
  55  |       if (await showMoreSmall.count() > 0) {
  56  |         await showMoreSmall.first().click()
  57  |         await page.waitForTimeout(500)
  58  |         const popup = page.locator('.rbc-overlay, [class*="overlay"]')
  59  |         if (await popup.count() > 0) {
  60  |           await expect(popup.first()).toBeVisible()
  61  |         }
  62  |       }
  63  |       // Either way, calendar should remain functional
  64  |       await expect(page.locator('.rbc-calendar')).toBeVisible()
  65  |     }
  66  |   })
  67  |
  68  |   test('click outside popup hides it (useClickOutside)', async ({ page }) => {
  69  |     const showMore = page.locator('.rbc-show-more')
  70  |     if (await showMore.count() > 0) {
  71  |       await showMore.first().click()
  72  |       await page.waitForTimeout(500)
  73  |
  74  |       // Check if popup appeared
  75  |       const popup = page.locator('.rbc-overlay')
  76  |       if (await popup.count() > 0) {
  77  |         // Click outside the popup (in the calendar toolbar)
  78  |         await page.locator('.rbc-toolbar').click()
  79  |         await page.waitForTimeout(400)
  80  |
  81  |         // Popup should be hidden now
  82  |         const popupAfter = await page.locator('.rbc-overlay').count()
  83  |         expect(popupAfter).toBe(0)
  84  |       }
  85  |     }
  86  |     await expect(page.locator('.rbc-calendar')).toBeVisible()
  87  |   })
  88  | })
  89  |
  90  | test.describe('PopOverlay.js — overlay with position', () => {
  91  |   test.beforeEach(async ({ page }) => {
  92  |     // Use small viewport to force overflow and popup
  93  |     await page.setViewportSize({ width: 900, height: 600 })
  94  |     await loadStory(page, POPUP_STORY)
  95  |   })
  96  |
  97  |   test('popup overlay positions within viewport bounds', async ({ page }) => {
  98  |     const showMore = page.locator('.rbc-show-more')
  99  |     if (await showMore.count() > 0) {
  100 |       const showMoreBox = await showMore.first().boundingBox()
  101 |       await showMore.first().click()
  102 |       await page.waitForTimeout(600)
  103 |
  104 |       const overlay = page.locator('.rbc-overlay')
  105 |       if (await overlay.count() > 0) {
  106 |         const overlayBox = await overlay.first().boundingBox()
  107 |         if (overlayBox && showMoreBox) {
  108 |           // Overlay should be positioned near the show-more button
  109 |           expect(overlayBox.x).toBeGreaterThanOrEqual(0)
  110 |           expect(overlayBox.y).toBeGreaterThanOrEqual(0)
  111 |           // Should be within viewport
  112 |           expect(overlayBox.x + overlayBox.width).toBeLessThanOrEqual(1000)
  113 |         }
  114 |       }
  115 |     }
  116 |     await expect(page.locator('.rbc-calendar')).toBeVisible()
  117 |   })
  118 | })
  119 |
```
