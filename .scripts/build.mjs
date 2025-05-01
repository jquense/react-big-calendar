#!/usr/bin/env zx
import { fs } from 'zx'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Skip the browserslist update in non-CI environments
console.log(chalk.blue('[BEGIN BUILD]'))
console.log(chalk.blue('Building js'))
// build distributables
if (process.platform === 'win32') {
  await $`set NODE_ENV=production && rollup -c`
} else {
  await $`NODE_ENV=production rollup -c`
}

console.log(chalk.blue(`Compiling 'lib' js files`))
// build files used for overrides
if (process.platform === 'win32') {
  await $`set NODE_ENV=production && set RBC_CJS_BUILD=true && babel src --out-dir lib`
} else {
  await $`NODE_ENV=production RBC_CJS_BUILD=true babel src --out-dir lib`
}

console.log(chalk.blue(`Copying SASS files to 'lib'`))
// and since we don't currently use CSS modules...
await fs.copy('./src/sass', './lib/sass')
console.log(chalk.blue(`...and the 'Add-on' SASS`))
// don't forget DnD
await fs.copy(
  './src/addons/dragAndDrop/styles.scss',
  './lib/addons/dragAndDrop/styles.scss'
)

// Check if lib/css directory exists, if not create it
await fs.ensureDir('./lib/css')
// Check if lib/addons/dragAndDrop directory exists, if not create it
await fs.ensureDir('./lib/addons/dragAndDrop')

console.log(chalk.blue('Now we will build some CSS'))
// Compile SASS from './lib' to get sourcemaps
console.log(chalk.blue('Compile base styles'))
await $`npx sass ./lib/sass/styles.scss ./lib/css/react-big-calendar.css`
console.log(chalk.blue('Compile Add-on styles'))
// don't forget DnD
await $`npx sass ./lib/addons/dragAndDrop/styles.scss ./lib/addons/dragAndDrop/styles.css`
console.log(chalk.blue('Post process all CSS'))
// We do not use postcss to process SASS, as it's
// SASS processor still uses node-sass by default
await $`npx postcss -r ./lib/**/*.css`
console.log(chalk.blue('[BUILD COMPLETE]'))
