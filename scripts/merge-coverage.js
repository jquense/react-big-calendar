#!/usr/bin/env node
/**
 * Merge Jest (coverage/coverage-final.json) and Playwright (.nyc_output/*.json)
 * Istanbul coverage objects, then print a text/lcov summary.
 *
 * Uses istanbul-lib-coverage + istanbul-lib-report + istanbul-reports which are
 * already installed as transitive Jest dependencies — no extra install needed.
 *
 * Run via:   yarn coverage:merge
 *
 * Prerequisites:
 *   1. yarn test:coverage              → writes coverage/coverage-final.json
 *   2. COVERAGE=true yarn playwright   → writes .nyc_output/<id>.json files
 */

const fs = require('fs')
const path = require('path')
const libCoverage = require('istanbul-lib-coverage')
const libReport = require('istanbul-lib-report')
const reports = require('istanbul-reports')

const ROOT = path.resolve(__dirname, '..')
const JEST_FINAL = path.join(ROOT, 'coverage', 'coverage-final.json')
const NYC_OUTPUT = path.join(ROOT, '.nyc_output')
const REPORT_DIR = path.join(ROOT, 'coverage-merged')

// ── Load Jest coverage ───────────────────────────────────────────────────────
if (!fs.existsSync(JEST_FINAL)) {
  console.error('ERROR: coverage/coverage-final.json not found.')
  console.error('       Run: yarn test:coverage  first.')
  process.exit(1)
}

const map = libCoverage.createCoverageMap(
  JSON.parse(fs.readFileSync(JEST_FINAL, 'utf8'))
)

// ── Merge Playwright coverage files ─────────────────────────────────────────
let playwrightFiles = 0
if (fs.existsSync(NYC_OUTPUT)) {
  for (const file of fs.readdirSync(NYC_OUTPUT)) {
    if (!file.endsWith('.json')) continue
    try {
      const data = JSON.parse(
        fs.readFileSync(path.join(NYC_OUTPUT, file), 'utf8')
      )
      map.merge(libCoverage.createCoverageMap(data))
      playwrightFiles++
    } catch {
      // skip malformed files
    }
  }
}

// ── Generate reports ─────────────────────────────────────────────────────────
if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true })

const context = libReport.createContext({
  dir: REPORT_DIR,
  defaultSummarizer: 'flat',
  coverageMap: map,
})

// Text summary in terminal
reports.create('text').execute(context)
// LCOV for tooling / CI
reports.create('lcov').execute(context)
// JSON for further processing
reports.create('json').execute(context)

console.log()
console.log(`Merged ${map.files().length} instrumented file(s)`)
console.log(`  Jest source:        coverage/coverage-final.json`)
console.log(`  Playwright sources: ${playwrightFiles} file(s) from .nyc_output/`)
console.log(`  HTML/LCOV report:   coverage-merged/`)
