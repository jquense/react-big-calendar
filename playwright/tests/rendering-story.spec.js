/**
 * Regression test for #2806.
 *
 * The "Customized Component Rendering" example imports a SCSS module and reads
 * `styles.specialDay` from inside `dayPropGetter`/`slotPropGetter`. css-loader v7
 * defaults `modules.namedExport` to true, which removes the default export, so
 * `import styles from './rendering.module.scss'` resolved to `undefined` and the
 * story crashed with "Cannot read properties of undefined (reading 'specialDay')"
 * as soon as a view calling those getters was selected.
 *
 * The story opens on Agenda, which never calls `dayPropGetter`, so the crash only
 * surfaced on switching to Month/Week/Day.
 */
const { test, expect } = require('@playwright/test')
const { loadStory } = require('../helpers/storybook')

const STORY_ID = 'examples--example-8'

// The generated class is hashed ([name]__[local]--[hash]), so match on the
// local name rather than the full identifier.
const SPECIAL_DAY = '[class*="specialDay"]'

for (const view of ['Month', 'Week', 'Day']) {
  test(`rendering example applies SCSS module classes in ${view} view`, async ({
    page,
  }) => {
    const pageErrors = []
    page.on('pageerror', (error) => pageErrors.push(error.message))

    await loadStory(page, STORY_ID)

    await page.getByRole('button', { name: view, exact: true }).click()

    // The calendar survives the view change (an uncaught render error would
    // unmount it and leave the Storybook error overlay behind).
    await expect(page.locator('.rbc-calendar')).toBeVisible()

    // The SCSS module resolved to a real object, so the custom class landed
    // on the 7th/15th cells returned by the prop getters. Attached rather than
    // visible: Day view renders the day header cell but keeps it hidden.
    await expect(page.locator(SPECIAL_DAY).first()).toBeAttached()

    expect(pageErrors).toEqual([])
  })
}
