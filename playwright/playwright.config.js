const { defineConfig, devices } = require('@playwright/test')

// One worker by default on all machines.
// Override for CI where there is more RAM: PLAYWRIGHT_WORKERS=2 yarn playwright
const WORKERS = parseInt(process.env.PLAYWRIGHT_WORKERS ?? '1', 10)

module.exports = defineConfig({
  testDir: './tests',

  // A single worker means one Chromium process at a time.
  // This is the most important memory control — each additional
  // worker spawns a full browser instance (~150-300 MB each).
  workers: WORKERS,

  // Tests within a file are already sequential; no parallelism gain
  // from enabling this at the cost of more concurrent contexts.
  fullyParallel: false,

  // Hard cap per test. Prevents a hung test from holding a browser
  // open indefinitely and accumulating memory.
  timeout: 45_000,

  // Stop after the first 5 failures rather than running the whole suite.
  // Avoids burning RAM on a test run that is already broken.
  maxFailures: 5,

  expect: { timeout: 10_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: '../playwright-report', open: 'never' }],
  ],

  use: {
    baseURL: 'http://localhost:9002',
    headless: true,

    // Smaller viewport uses less GPU/compositor memory.
    // 1024×768 is still large enough for all calendar stories.
    viewport: { width: 1024, height: 768 },

    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',

    // Traces are written per-retry, not per-test, so this is low-cost
    // but saves a full trace when a flaky test is investigated.
    trace: 'on-first-retry',

    // Chrome flags that reduce memory consumption in headless mode.
    launchOptions: {
      args: [
        // Use /tmp instead of /dev/shm (prevents OOM on small /dev/shm).
        '--disable-dev-shm-usage',
        // No GPU process — saves a separate ~50 MB process.
        '--disable-gpu',
        // Disable the WebGL renderer.
        '--disable-software-rasterizer',
        // Reduce renderer memory budget.
        '--renderer-process-limit=1',
        // Disable background throttling that can cause unbounded queues.
        '--disable-background-timer-throttling',
        // Cap JS heap to 256 MB per renderer (default is ~1.5 GB).
        '--js-flags=--max-old-space-size=256',
        // Disable site isolation so all tests share one renderer process.
        '--disable-site-isolation-trials',
      ],
    },
  },

  projects: [
    {
      name: 'chromium',
      // Do NOT spread devices['Desktop Chrome'] — that overrides our
      // launchOptions and viewport with its own defaults.
      use: { channel: 'chromium' },
    },
  ],

  webServer: {
    // When COVERAGE=true, Storybook must be built with babel-plugin-istanbul so
    // that window.__coverage__ is populated after each test.
    command: process.env.COVERAGE === 'true'
      ? 'COVERAGE=true yarn storybook'
      : 'yarn storybook',
    url: 'http://localhost:9002',
    // Reuse an already-running Storybook so we don't pay the startup
    // cost (and memory spike) on every run locally.
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
