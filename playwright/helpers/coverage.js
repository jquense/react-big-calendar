/**
 * Istanbul coverage helpers for Playwright.
 *
 * When Storybook is built with COVERAGE=true, every src/ file is instrumented
 * with babel-plugin-istanbul. After each Playwright test the runtime coverage
 * object (window.__coverage__) is harvested and written to .nyc_output/ so
 * that it can be merged with the Jest coverage report.
 *
 * Usage:
 *   const { test, expect } = require('./helpers/coverage')
 *   // identical to @playwright/test but page.coverage is collected automatically
 *
 * To generate the merged report:
 *   yarn coverage:merge   (runs scripts/merge-coverage.js)
 *   yarn coverage:report  (runs nyc report over the merged output)
 */

const { test: base, expect } = require('@playwright/test')
const fs = require('fs')
const path = require('path')

const NYC_OUTPUT = path.resolve(__dirname, '../../.nyc_output')

// Ensure the output dir exists at module load time (not per-test).
if (!fs.existsSync(NYC_OUTPUT)) {
  fs.mkdirSync(NYC_OUTPUT, { recursive: true })
}

const test = base.extend({
  /**
   * Auto-fixture: collect window.__coverage__ after every test and persist
   * it to .nyc_output/<uuid>.json. Silently skips when coverage is absent
   * (i.e. Storybook built without COVERAGE=true).
   */
  page: async ({ page }, use, testInfo) => {
    await use(page)

    // Harvest coverage only when Istanbul instrumentation is present.
    const coverage = await page.evaluate(() => window.__coverage__)
    if (!coverage) return

    // Use the test's unique id as the filename so parallel workers don't clash.
    const safe = testInfo.testId.replace(/[^a-z0-9_-]/gi, '_').slice(0, 120)
    const dest = path.join(NYC_OUTPUT, `${safe}.json`)
    fs.writeFileSync(dest, JSON.stringify(coverage), 'utf8')
  },
})

module.exports = { test, expect }
