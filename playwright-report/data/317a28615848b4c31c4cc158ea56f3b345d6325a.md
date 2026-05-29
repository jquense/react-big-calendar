# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: time-grid.spec.js >> TimeGridHeader.js — rendering and overflow >> overflow detection applies margin when scrollbar visible (isOverflowing branch)
- Location: playwright/tests/time-grid.spec.js:157:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.rbc-time-header').locator('.rbc-overflowing')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('.rbc-time-header').locator('.rbc-overflowing')

```

```yaml
- button "Today"
- button "Back"
- button "Next"
- text: May 24 – 30
- button "Month"
- button "Week"
- button "Day"
- button "Agenda"
- button "24 Sun":
    - columnheader "24 Sun"
- button "25 Mon":
    - columnheader "25 Mon"
- button "26 Tue":
    - columnheader "26 Tue"
- button "27 Wed":
    - columnheader "27 Wed"
- button "28 Thu":
    - columnheader "28 Thu"
- button "29 Fri":
    - columnheader "29 Fri"
- button "30 Sat":
    - columnheader "30 Sat"
- rowgroup:
    - row "test multi-day test 2 days test all day"
- text: 12:00 AM 1:00 AM 2:00 AM 3:00 AM 4:00 AM 5:00 AM 6:00 AM 7:00 AM 8:00 AM 9:00 AM 10:00 AM 11:00 AM 12:00 PM 1:00 PM 2:00 PM 3:00 PM 4:00 PM 5:00 PM 6:00 PM 7:00 PM 8:00 PM 9:00 PM 10:00 PM 11:00 PM
- button "5:00 AM – 10:00 AM test larger"
- button "3:00 PM – 11:00 PM test larger"
- button "8:51 AM – 9:51 AM test"
```

# Test source

```ts
  65  |   test('day columns render for each day of the week', async ({ page }) => {
  66  |     const daySlots = page.locator('.rbc-day-slot')
  67  |     const count = await daySlots.count()
  68  |     expect(count).toBeGreaterThanOrEqual(7) // 7 days in week view
  69  |   })
  70  | })
  71  |
  72  | test.describe('TimeGrid.js — scroll handling', () => {
  73  |   test.beforeEach(async ({ page }) => {
  74  |     await loadStory(page, WEEK_SELECTABLE)
  75  |   })
  76  |
  77  |   test('scroll event fires handleScroll without error', async ({ page }) => {
  78  |     const content = page.locator('.rbc-time-content')
  79  |     await content.evaluate(el => {
  80  |       el.scrollTop = 100
  81  |       el.dispatchEvent(new Event('scroll'))
  82  |     })
  83  |     await page.waitForTimeout(200)
  84  |     await expect(page.locator('.rbc-time-view')).toBeVisible()
  85  |   })
  86  | })
  87  |
  88  | test.describe('DayColumn.js — rendering', () => {
  89  |   test.beforeEach(async ({ page }) => {
  90  |     await loadStory(page, DAY_VIEW)
  91  |   })
  92  |
  93  |   test('day view renders a single day column', async ({ page }) => {
  94  |     await expect(page.locator('.rbc-day-slot')).toBeVisible()
  95  |   })
  96  |
  97  |   test('time indicator renders in current day (setTimeIndicatorPositionUpdateInterval)', async ({ page }) => {
  98  |     // The current time indicator is rendered when the displayed date is today
  99  |     // Since the story uses defaultDate: new Date(), today should show the indicator
  100 |     const indicator = page.locator('.rbc-current-time-indicator')
  101 |     // Not all test dates will be today, but the component logic runs
  102 |     await expect(page.locator('.rbc-day-slot')).toBeVisible()
  103 |   })
  104 | })
  105 |
  106 | test.describe('DayColumn.js — slot selection (selectable)', () => {
  107 |   test.beforeEach(async ({ page }) => {
  108 |     await loadStory(page, WEEK_SELECTABLE)
  109 |   })
  110 |
  111 |   test('mousedown on day slot starts selection (_selectable)', async ({ page }) => {
  112 |     const column = page.locator('.rbc-day-slot').first()
  113 |     const box = await column.boundingBox()
  114 |     await page.mouse.click(box.x + box.width / 2, box.y + 40)
  115 |     await page.waitForTimeout(200)
  116 |     await expect(page.locator('.rbc-time-view')).toBeVisible()
  117 |   })
  118 |
  119 |   test('drag across time slots creates a range (handles mousemove → onSelectSlot)', async ({ page }) => {
  120 |     const column = page.locator('.rbc-day-slot').first()
  121 |     const box = await column.boundingBox()
  122 |
  123 |     await page.mouse.move(box.x + box.width / 2, box.y + 20)
  124 |     await page.mouse.down()
  125 |     await page.mouse.move(box.x + box.width / 2, box.y + 20, { steps: 2 })
  126 |     await page.mouse.move(box.x + box.width / 2, box.y + 80, { steps: 5 })
  127 |     await page.mouse.up()
  128 |     await page.waitForTimeout(200)
  129 |
  130 |     await expect(page.locator('.rbc-time-view')).toBeVisible()
  131 |   })
  132 | })
  133 |
  134 | test.describe('TimeGridHeader.js — rendering and overflow', () => {
  135 |   test.beforeEach(async ({ page }) => {
  136 |     await loadStory(page, WEEK_SELECTABLE)
  137 |   })
  138 |
  139 |   test('time header renders with day headers', async ({ page }) => {
  140 |     const header = page.locator('.rbc-time-header')
  141 |     await expect(header).toBeVisible()
  142 |     const dayHeaders = page.locator('.rbc-header')
  143 |     const count = await dayHeaders.count()
  144 |     expect(count).toBeGreaterThanOrEqual(7)
  145 |   })
  146 |
  147 |   test('header date buttons are clickable (handleHeaderClick)', async ({ page }) => {
  148 |     const button = page.locator('.rbc-header .rbc-button-link').first()
  149 |     if (await button.count() > 0) {
  150 |       await button.click()
  151 |       await page.waitForTimeout(300)
  152 |       // Should navigate to day view or trigger drilldown
  153 |       await expect(page.locator('.rbc-calendar')).toBeVisible()
  154 |     }
  155 |   })
  156 |
  157 |   test('overflow detection applies margin when scrollbar visible (isOverflowing branch)', async ({ page }) => {
  158 |     const content = page.locator('.rbc-time-content')
  159 |     const scrollHeight = await content.evaluate(el => el.scrollHeight)
  160 |     const clientHeight = await content.evaluate(el => el.clientHeight)
  161 |     // If content overflows, isOverflowing=true applies scrollbar margin to header
  162 |     const header = page.locator('.rbc-time-header')
  163 |     await expect(header).toBeVisible()
  164 |     if (scrollHeight > clientHeight) {
> 165 |       await expect(header.locator('.rbc-overflowing')).toBeVisible()
      |                                                        ^ Error: expect(locator).toBeVisible() failed
  166 |     }
  167 |   })
  168 | })
  169 |
  170 | test.describe('TimeGridHeader.js — all-day events row (renderRow)', () => {
  171 |   test.beforeEach(async ({ page }) => {
  172 |     await loadStory(page, 'additional-examples-layout--first-of-week-all-day')
  173 |   })
  174 |
  175 |   test('all-day events appear in the header row', async ({ page }) => {
  176 |     await expect(page.locator('.rbc-allday-cell')).toBeVisible()
  177 |     const allDayEvents = page.locator('.rbc-allday-cell .rbc-event')
  178 |     const count = await allDayEvents.count()
  179 |     expect(count).toBeGreaterThan(0)
  180 |   })
  181 | })
  182 |
  183 | test.describe('TimeGrid with resources (TimeGridHeaderResources)', () => {
  184 |   test.beforeEach(async ({ page }) => {
  185 |     await loadStory(page, 'additional-examples-drag-and-drop--draggable-multiple-resources')
  186 |   })
  187 |
  188 |   test('resource headers render (TimeGridHeaderResources)', async ({ page }) => {
  189 |     await expect(page.locator('.rbc-time-view')).toBeVisible()
  190 |     // Resource columns render in the time header
  191 |     const resourceHeaders = page.locator('.rbc-row-resource, .rbc-header')
  192 |     const count = await resourceHeaders.count()
  193 |     expect(count).toBeGreaterThan(0)
  194 |   })
  195 |
  196 |   test('multiple day columns render (one per resource)', async ({ page }) => {
  197 |     const daySlots = page.locator('.rbc-day-slot')
  198 |     const count = await daySlots.count()
  199 |     expect(count).toBeGreaterThan(0)
  200 |   })
  201 | })
  202 |
```
