const { execSync } = require('child_process')
const fs = require('fs-extra')
const path = require('path')

// Helper to run commands and log output
function run(cmd, desc, env = {}) {
  console.log(`\x1b[34m${desc}\x1b[0m`)
  try {
    execSync(cmd, {
      stdio: 'inherit',
      env: { ...process.env, ...env },
    })
  } catch (error) {
    console.error(`\x1b[31mError executing: ${cmd}\x1b[0m`)
    throw error
  }
}

// Start the build process
console.log('\x1b[34m[BEGIN BUILD]\x1b[0m')

// 1. Build distributables
console.log('\x1b[34mBuilding js\x1b[0m')
run('npx rollup -c', 'Running rollup', { NODE_ENV: 'production' })

// 2. Build files used for overrides
console.log("\x1b[34mCompiling 'lib' js files\x1b[0m")
run('npx babel src --out-dir lib', 'Running babel', {
  NODE_ENV: 'production',
  RBC_CJS_BUILD: 'true',
})

// 3. Copy SASS files
console.log("\x1b[34mCopying SASS files to 'lib'\x1b[0m")
fs.copySync('./src/sass', './lib/sass')

console.log("\x1b[34m...and the 'Add-on' SASS\x1b[0m")
// Ensure directory exists
fs.ensureDirSync(path.join(__dirname, 'lib', 'addons', 'dragAndDrop'))
// Copy DnD styles
fs.copySync(
  './src/addons/dragAndDrop/styles.scss',
  './lib/addons/dragAndDrop/styles.scss'
)

// Ensure CSS directory exists
fs.ensureDirSync('./lib/css')

// 4. Compile SASS
console.log('\x1b[34mNow we will build some CSS\x1b[0m')
console.log('\x1b[34mCompile base styles\x1b[0m')
run(
  'npx sass ./lib/sass/styles.scss ./lib/css/react-big-calendar.css',
  'Compiling styles.scss'
)

console.log('\x1b[34mCompile Add-on styles\x1b[0m')
run(
  'npx sass ./lib/addons/dragAndDrop/styles.scss ./lib/addons/dragAndDrop/styles.css',
  'Compiling drag-and-drop styles'
)

// 5. Post process with PostCSS
console.log('\x1b[34mPost process all CSS\x1b[0m')
run(
  'npx postcss ./lib/css/*.css ./lib/addons/**/*.css --replace',
  'Running PostCSS'
)

console.log('\x1b[34m[BUILD COMPLETE]\x1b[0m')
