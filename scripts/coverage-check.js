#!/usr/bin/env node
/**
 * Coverage check — prints a per-file pass/fail table against our targets
 * and writes the same report to coverage/summary.md.
 *
 *   Branches  ≥ 85 %
 *   Functions ≥ 95 %
 *
 * Reads (in priority order):
 *   1. coverage-merged/coverage-final.json  (Jest + Playwright merged)
 *   2. coverage/coverage-final.json         (Jest only)
 *
 * Run via:   yarn coverage:check
 */

'use strict'

const fs   = require('fs')
const path = require('path')

// ── Targets ───────────────────────────────────────────────────────────────────
const BRANCH_TARGET = 85
const FUNC_TARGET   = 95

// ── Locate coverage data ──────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..')

const CANDIDATES = [
  path.join(ROOT, 'coverage-merged', 'coverage-final.json'),
  path.join(ROOT, 'coverage', 'coverage-final.json'),
]

const coveragePath = CANDIDATES.find(fs.existsSync)

if (!coveragePath) {
  console.error('\n  ❌  No coverage data found.')
  console.error('       Run one of:')
  console.error('         yarn test:coverage             (Jest only)')
  console.error('         yarn coverage:full             (Jest + Playwright merged)\n')
  process.exit(1)
}

const raw = JSON.parse(fs.readFileSync(coveragePath, 'utf8'))

// ── Compute per-file stats ────────────────────────────────────────────────────
function computeStats(entry) {
  let bTotal = 0, bCovered = 0
  for (const counts of Object.values(entry.b || {})) {
    for (const c of counts) {
      bTotal++
      if (c > 0) bCovered++
    }
  }

  let fTotal = 0, fCovered = 0
  for (const c of Object.values(entry.f || {})) {
    fTotal++
    if (c > 0) fCovered++
  }

  return {
    branches:  bTotal === 0 ? null : (bCovered / bTotal) * 100,
    functions: fTotal === 0 ? null : (fCovered / fTotal) * 100,
    bTotal, bCovered, fTotal, fCovered,
  }
}

// ── Build row data ────────────────────────────────────────────────────────────
let totBTotal = 0, totBCovered = 0, totFTotal = 0, totFCovered = 0

const rows = Object.entries(raw)
  .filter(([fp]) => fp.includes('/src/') && !fp.includes('/src/sass/'))
  .map(([fp, entry]) => {
    const stats = computeStats(entry)
    totBTotal   += stats.bTotal
    totBCovered += stats.bCovered
    totFTotal   += stats.fTotal
    totFCovered += stats.fCovered

    const branchPass = stats.branches  === null || stats.branches  >= BRANCH_TARGET
    const funcPass   = stats.functions === null || stats.functions >= FUNC_TARGET
    const testRun    = stats.fTotal === 0 ? null
                     : stats.fCovered > 0 ? 'PASS'
                     : 'FAIL'

    return {
      file:      fp.replace(/.*\/src\//, 'src/'),
      branches:  stats.branches,
      functions: stats.functions,
      branchPass,
      funcPass,
      targetMet: branchPass && funcPass,
      testRun,
    }
  })
  .sort((a, b) => a.file.localeCompare(b.file))

const totalBranch    = totBTotal === 0 ? null : (totBCovered / totBTotal) * 100
const totalFunc      = totFTotal === 0 ? null : (totFCovered / totFTotal) * 100
const totalBranchPass = totalBranch === null || totalBranch >= BRANCH_TARGET
const totalFuncPass   = totalFunc   === null || totalFunc   >= FUNC_TARGET
const totalTargetMet  = totalBranchPass && totalFuncPass
const overallPass     = rows.every(r => r.targetMet)
const generated       = new Date().toISOString()
const sourceLabel     = path.relative(ROOT, coveragePath)
const failing         = rows.filter(r => !r.targetMet)

// ═════════════════════════════════════════════════════════════════════════════
// TERMINAL OUTPUT  (ANSI colour, aligned columns)
// ═════════════════════════════════════════════════════════════════════════════

const PASS_DOT = '🟢'
const FAIL_DOT = '🔴'

const isTTY = process.stdout.isTTY
const clr  = (code, s) => isTTY ? `\x1b[${code}m${s}\x1b[0m` : s
const green = s => clr('32', s)
const red   = s => clr('31', s)
const bold  = s => clr('1',  s)
const dim   = s => clr('2',  s)

const plainLen = s => s.replace(/\x1b\[[0-9;]*m/g, '').length
const pad      = (s, w)          => String(s).padEnd(w)
const lpad     = (s, w)          => String(s).padStart(w)
const padAnsi  = (s, w, right=false) => {
  const fill = ' '.repeat(Math.max(0, w - plainLen(s)))
  return right ? fill + s : s + fill
}

function termPct(val, target) {
  if (val === null) return '    —    '
  const s = val.toFixed(2) + '%'
  return val >= target ? green(s.padStart(8)) : red(s.padStart(8))
}
const termTarget  = met  => met ? green('YES'.padEnd(5)) : red('NO'.padEnd(5))
const termTestRun = val  => val === null ? dim('n/a'.padEnd(6))
                          : val === 'PASS' ? green('PASS') : red('FAIL')
const termStatus  = pass => pass ? PASS_DOT : FAIL_DOT

const FILE_W = Math.max(...rows.map(r => r.file.length), 'File'.length)
const LINE   = '─'.repeat(FILE_W + 64)
const DLINE  = '═'.repeat(FILE_W + 64)

console.log()
console.log(bold('Coverage Check'))
console.log(DLINE)
console.log()
console.log(`  Result:    ${overallPass ? '✅ ' + green('passed') : '❌ ' + red('failed')}`)
console.log(`  Source:    ${sourceLabel}`)
console.log(`  Targets:   branches ≥ ${BRANCH_TARGET}%  ·  functions ≥ ${FUNC_TARGET}%`)
console.log(`  Generated: ${generated}`)
console.log()
console.log(
  '  ' + bold(pad('Status', 8)) + '  ' +
  bold(pad('File', FILE_W))     + '  ' +
  bold(lpad('Branches', 10))    + '  ' +
  bold(lpad('Functions', 10))   + '  ' +
  bold(pad('Target Met', 11))   + '  ' +
  bold('Test Run')
)
console.log('  ' + LINE)

for (const row of rows) {
  console.log(
    `  ${termStatus(row.targetMet)}  ` +
    pad(row.file, FILE_W)                                       + '  ' +
    padAnsi(termPct(row.branches,  BRANCH_TARGET), 10, true)   + '  ' +
    padAnsi(termPct(row.functions, FUNC_TARGET),   10, true)   + '  ' +
    padAnsi(termTarget(row.targetMet), 11)                      + '  ' +
    padAnsi(termTestRun(row.testRun), 6)
  )
}

console.log('  ' + LINE)
console.log(
  `  ${termStatus(totalTargetMet)}  ` +
  bold(pad('TOTAL', FILE_W))                                        + '  ' +
  padAnsi(termPct(totalBranch, BRANCH_TARGET), 10, true)            + '  ' +
  padAnsi(termPct(totalFunc,   FUNC_TARGET),   10, true)            + '  ' +
  padAnsi(termTarget(totalTargetMet), 11)                            + '  ' +
  dim('n/a')
)
console.log()

if (failing.length > 0) {
  console.log(bold('  Files below target:'))
  for (const r of failing) {
    const issues = []
    if (!r.branchPass) issues.push(`branches ${r.branches === null ? 'n/a' : r.branches.toFixed(1) + '%'} < ${BRANCH_TARGET}%`)
    if (!r.funcPass)   issues.push(`functions ${r.functions === null ? 'n/a' : r.functions.toFixed(1) + '%'} < ${FUNC_TARGET}%`)
    console.log(`  ${FAIL_DOT}  ${r.file}  ${red(issues.join(', '))}`)
  }
  console.log()
}

// ═════════════════════════════════════════════════════════════════════════════
// MARKDOWN OUTPUT  written to coverage/summary.md
// ═════════════════════════════════════════════════════════════════════════════

function mdPct(val, target) {
  if (val === null) return '—'
  const s = val.toFixed(2) + '%'
  return val >= target ? `**${s}**` : s
}
const mdStatus  = pass => pass ? '🟢' : '🔴'
const mdTarget  = met  => met  ? 'YES' : 'NO'
const mdTestRun = val  => val === null ? 'n/a' : val

const mdLines = []

mdLines.push('# Coverage Check')
mdLines.push('')
mdLines.push(`**Result:** ${overallPass ? '✅ passed' : '❌ failed'}  `)
mdLines.push(`**Generated:** ${generated}  `)
mdLines.push(`**Source:** \`${sourceLabel}\`  `)
mdLines.push(`**Targets:** branches ≥ ${BRANCH_TARGET}% · functions ≥ ${FUNC_TARGET}%`)
mdLines.push('')

// Table header
mdLines.push('| Status | File | Branches | Functions | Target Met | Test Run |')
mdLines.push('|--------|------|----------|-----------|:----------:|:--------:|')

// Data rows
for (const row of rows) {
  mdLines.push(
    `| ${mdStatus(row.targetMet)} ` +
    `| \`${row.file}\` ` +
    `| ${mdPct(row.branches, BRANCH_TARGET)} ` +
    `| ${mdPct(row.functions, FUNC_TARGET)} ` +
    `| ${mdTarget(row.targetMet)} ` +
    `| ${mdTestRun(row.testRun)} |`
  )
}

// Total row
mdLines.push(
  `| ${mdStatus(totalTargetMet)} ` +
  `| **TOTAL** ` +
  `| ${mdPct(totalBranch, BRANCH_TARGET)} ` +
  `| ${mdPct(totalFunc, FUNC_TARGET)} ` +
  `| ${mdTarget(totalTargetMet)} ` +
  `| n/a |`
)

// Files below target
if (failing.length > 0) {
  mdLines.push('')
  mdLines.push('## Files below target')
  mdLines.push('')
  for (const r of failing) {
    const issues = []
    if (!r.branchPass) issues.push(`branches ${r.branches === null ? 'n/a' : r.branches.toFixed(1) + '%'} < ${BRANCH_TARGET}%`)
    if (!r.funcPass)   issues.push(`functions ${r.functions === null ? 'n/a' : r.functions.toFixed(1) + '%'} < ${FUNC_TARGET}%`)
    mdLines.push(`- 🔴 \`${r.file}\` — ${issues.join(', ')}`)
  }
}

mdLines.push('')

// Write the file
const summaryDir  = path.join(ROOT, 'coverage')
const summaryPath = path.join(summaryDir, 'summary.md')

if (!fs.existsSync(summaryDir)) fs.mkdirSync(summaryDir, { recursive: true })
fs.writeFileSync(summaryPath, mdLines.join('\n'), 'utf8')

console.log(`  📄  Report written to coverage/summary.md`)
console.log()

process.exit(overallPass ? 0 : 1)
