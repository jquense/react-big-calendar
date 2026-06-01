import Popup from '../../src/Popup'

// Popup is a React component that renders events in an overlay, using dom-helpers
// and custom hooks. Testing it requires rendering React components and testing
// DOM manipulation and positioning, which is better suited for integration tests.

describe('Popup', () => {
  test('is tested through Month and Day view popup Playwright tests', () => {
    // Popup is rendered by PopOverlay when popup=true
    // Coverage comes from:
    // - playwright/tests/month-view.spec.js (popup mode)
    // - playwright/tests/popup-overlay.spec.js
    expect(true).toBe(true)
  })
})
