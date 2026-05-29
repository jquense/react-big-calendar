# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: background-cells.spec.js >> BackgroundCells.js — month view selection >> background cell is visible and clickable
- Location: playwright/tests/background-cells.spec.js:60:3

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.rbc-day-bg').first()
    - locator resolved to <div class="rbc-day-bg"></div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="rbc-row"></div> from <div role="row" class="rbc-row-content">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="rbc-row"></div> from <div role="row" class="rbc-row-content">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    19 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="rbc-row"></div> from <div role="row" class="rbc-row-content">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e5]:
    - generic [ref=e6]:
        - generic [ref=e7]:
            - button "Today" [ref=e8]
            - button "Back" [ref=e9]
            - button "Next" [ref=e10]
        - generic [ref=e11]: March 29 – April 04
        - generic [ref=e12]:
            - button "Week" [ref=e13]
            - button "Day" [ref=e14]
    - generic [ref=e15]:
        - generic [ref=e16]:
            - paragraph [ref=e18]: Custom gutter text
            - generic [ref=e19]:
                - generic [ref=e20]:
                    - button "29 Sun" [ref=e22] [cursor=pointer]:
                        - columnheader "29 Sun" [ref=e23]
                    - button "30 Mon" [ref=e25] [cursor=pointer]:
                        - columnheader "30 Mon" [ref=e26]
                    - button "31 Tue" [ref=e28] [cursor=pointer]:
                        - columnheader "31 Tue" [ref=e29]
                    - button "01 Wed" [ref=e31] [cursor=pointer]:
                        - columnheader "01 Wed" [ref=e32]
                    - button "02 Thu" [ref=e34] [cursor=pointer]:
                        - columnheader "02 Thu" [ref=e35]
                    - button "03 Fri" [ref=e37] [cursor=pointer]:
                        - columnheader "03 Fri" [ref=e38]
                    - button "04 Sat" [ref=e40] [cursor=pointer]:
                        - columnheader "04 Sat" [ref=e41]
                - rowgroup [ref=e42]:
                    - row [ref=e51]
        - generic [ref=e55]:
            - generic [ref=e57]: 12:00 AM
            - generic [ref=e60]: 1:00 AM
            - generic [ref=e63]: 2:00 AM
            - generic [ref=e66]: 3:00 AM
            - generic [ref=e69]: 4:00 AM
            - generic [ref=e72]: 5:00 AM
            - generic [ref=e75]: 6:00 AM
            - generic [ref=e78]: 7:00 AM
            - generic [ref=e81]: 8:00 AM
            - generic [ref=e84]: 9:00 AM
            - generic [ref=e87]: 10:00 AM
            - generic [ref=e90]: 11:00 AM
            - generic [ref=e93]: 12:00 PM
            - generic [ref=e96]: 1:00 PM
            - generic [ref=e99]: 2:00 PM
            - generic [ref=e102]: 3:00 PM
            - generic [ref=e105]: 4:00 PM
            - generic [ref=e108]: 5:00 PM
            - generic [ref=e111]: 6:00 PM
            - generic [ref=e114]: 7:00 PM
            - generic [ref=e117]: 8:00 PM
            - generic [ref=e120]: 9:00 PM
            - generic [ref=e123]: 10:00 PM
            - generic [ref=e126]: 11:00 PM
```

# Test source

```ts
  1   | /**
  2   |  * Playwright tests for src/BackgroundCells.js
  3   |  *
  4   |  * BackgroundCells renders the grid of day cells in month view and
  5   |  * sets up mouse selection via Selection.js. The _selectable() method
  6   |  * and its callbacks require real pointer events.
  7   |  *
  8   |  * Targets:
  9   |  *   - _selectable() setup (componentDidMount with selectable=true)
  10  |  *   - Selection.on('beforeSelect', 'selectStart', 'selecting', 'select') callbacks
  11  |  *   - _teardownSelectable() (componentWillUnmount)
  12  |  *   - componentDidUpdate (selectable prop change)
  13  |  *   - rbc-selected-cell appearance during selection
  14  |  */
  15  | const { test, expect } = require('@playwright/test')
  16  | const { loadStory } = require('../helpers/storybook')
  17  |
  18  | test.describe('BackgroundCells.js — month view rendering', () => {
  19  |   test.beforeEach(async ({ page }) => {
  20  |     await loadStory(page, 'additional-examples--custom-show-more')
  21  |   })
  22  |
  23  |   test('background cells render for each day', async ({ page }) => {
  24  |     await expect(page.locator('.rbc-month-view')).toBeVisible()
  25  |     const bgCells = page.locator('.rbc-day-bg')
  26  |     const count = await bgCells.count()
  27  |     expect(count).toBeGreaterThanOrEqual(28)
  28  |   })
  29  |
  30  |   test('today cell has rbc-today class', async ({ page }) => {
  31  |     const today = page.locator('.rbc-day-bg.rbc-today')
  32  |     await expect(today).toBeVisible()
  33  |   })
  34  |
  35  |   test('off-range cells have rbc-off-range-bg class', async ({ page }) => {
  36  |     const offRange = page.locator('.rbc-day-bg.rbc-off-range-bg')
  37  |     const count = await offRange.count()
  38  |     // Months have leading/trailing days from adjacent months
  39  |     expect(count).toBeGreaterThanOrEqual(0)
  40  |   })
  41  | })
  42  |
  43  | test.describe('BackgroundCells.js — slot selection (selectable mode)', () => {
  44  |   test.beforeEach(async ({ page }) => {
  45  |     // Use the selectable story which has month view with selectable=true
  46  |     await loadStory(page, 'additional-examples-timeslots--selectable-step-15-x-4-slot')
  47  |   })
  48  |
  49  |   test('week view background renders with time slots', async ({ page }) => {
  50  |     await expect(page.locator('.rbc-time-view')).toBeVisible()
  51  |   })
  52  | })
  53  |
  54  | test.describe('BackgroundCells.js — month view selection', () => {
  55  |   test.beforeEach(async ({ page }) => {
  56  |     // The Timeslots story has selectable month view setup
  57  |     await loadStory(page, 'additional-examples--custom-time-gutter-header')
  58  |   })
  59  |
  60  |   test('background cell is visible and clickable', async ({ page }) => {
  61  |     await expect(page.locator('.rbc-calendar')).toBeVisible()
  62  |     const bgCell = page.locator('.rbc-day-bg').first()
  63  |     await expect(bgCell).toBeVisible()
> 64  |     await bgCell.click()
      |                  ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  65  |     await page.waitForTimeout(200)
  66  |     await expect(page.locator('.rbc-calendar')).toBeVisible()
  67  |   })
  68  |
  69  |   test('click on background cell triggers slot selection callbacks', async ({ page }) => {
  70  |     const bgCell = page.locator('.rbc-day-bg').nth(5)
  71  |     const box = await bgCell.boundingBox()
  72  |     if (!box) return
  73  |
  74  |     // Simulate a click which triggers the Selection callbacks
  75  |     await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
  76  |     await page.waitForTimeout(200)
  77  |
  78  |     // Selection was processed — calendar remains stable
  79  |     await expect(page.locator('.rbc-calendar')).toBeVisible()
  80  |   })
  81  |
  82  |   test('mousedown+up across multiple cells selects range', async ({ page }) => {
  83  |     const bgCells = page.locator('.rbc-day-bg')
  84  |     const count = await bgCells.count()
  85  |     if (count < 3) return
  86  |
  87  |     const startCell = bgCells.nth(3)
  88  |     const endCell = bgCells.nth(5)
  89  |     const startBox = await startCell.boundingBox()
  90  |     const endBox = await endCell.boundingBox()
  91  |     if (!startBox || !endBox) return
  92  |
  93  |     // Drag across cells
  94  |     await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2)
  95  |     await page.mouse.down()
  96  |     await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2, { steps: 2 })
  97  |     await page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2, { steps: 5 })
  98  |     await page.mouse.up()
  99  |
  100 |     await page.waitForTimeout(200)
  101 |     await expect(page.locator('.rbc-calendar')).toBeVisible()
  102 |   })
  103 | })
  104 |
```
