# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: time-grid.spec.js >> TimeGridHeader.js — all-day events row (renderRow) >> all-day events appear in the header row
- Location: playwright/tests/time-grid.spec.js:175:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.rbc-allday-cell')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('.rbc-allday-cell')

```

```yaml
- button "Today"
- button "Back"
- button "Next"
- text: December 2016
- button "Month"
- button "Week"
- button "Day"
- button "Agenda"
- table "Month View":
    - row "Sun Mon Tue Wed Thu Fri Sat":
        - columnheader "Sun"
        - columnheader "Mon"
        - columnheader "Tue"
        - columnheader "Wed"
        - columnheader "Thu"
        - columnheader "Fri"
        - columnheader "Sat"
    - rowgroup:
        - row "27 28 29 30 01 02 03":
            - cell "27":
                - button "27"
            - cell "28":
                - button "28"
            - cell "29":
                - button "29"
            - cell "30":
                - button "30"
            - cell "01":
                - button "01"
            - cell "02":
                - button "02"
            - cell "03":
                - button "03"
    - rowgroup:
        - row "04 05 06 07 08 09 10 All Day Event":
            - cell "04":
                - button "04"
            - cell "05":
                - button "05"
            - cell "06":
                - button "06"
            - cell "07":
                - button "07"
            - cell "08":
                - button "08"
            - cell "09":
                - button "09"
            - cell "10":
                - button "10"
            - text: All Day Event
    - rowgroup:
        - row "11 12 13 14 15 16 17":
            - cell "11":
                - button "11"
            - cell "12":
                - button "12"
            - cell "13":
                - button "13"
            - cell "14":
                - button "14"
            - cell "15":
                - button "15"
            - cell "16":
                - button "16"
            - cell "17":
                - button "17"
    - rowgroup:
        - row "18 19 20 21 22 23 24":
            - cell "18":
                - button "18"
            - cell "19":
                - button "19"
            - cell "20":
                - button "20"
            - cell "21":
                - button "21"
            - cell "22":
                - button "22"
            - cell "23":
                - button "23"
            - cell "24":
                - button "24"
    - rowgroup:
        - row "25 26 27 28 29 30 31":
            - cell "25":
                - button "25"
            - cell "26":
                - button "26"
            - cell "27":
                - button "27"
            - cell "28":
                - button "28"
            - cell "29":
                - button "29"
            - cell "30":
                - button "30"
            - cell "31":
                - button "31"
```

# Test source

```ts
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
  165 |       await expect(header.locator('.rbc-overflowing')).toBeVisible()
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
> 176 |     await expect(page.locator('.rbc-allday-cell')).toBeVisible()
      |                                                    ^ Error: expect(locator).toBeVisible() failed
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
