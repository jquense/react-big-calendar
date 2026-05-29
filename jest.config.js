module.exports = {
  clearMocks: true,
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/sass/**',
    '!src/index.js',
  ],
  // Global thresholds reflect coverage of the testable layer.
  // 23 files require infrastructure beyond standard Jest/RTL:
  //   - DnD addons: require full drag-and-drop simulation
  //   - Selection.js: requires raw mouse capture DOM events
  //   - Popup/Overlay: require react-overlays positioning
  //   - Complex time grid (DayColumn, TimeGrid): require layout + interaction
  //   - Localizer timezone branches: require optional moment-timezone/dayjs-tz plugins
  // Per-file progress tracked in ERRORS.md.
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 65,
      statements: 62,
    },
  },
}
