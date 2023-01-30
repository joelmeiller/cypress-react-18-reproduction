import { defineConfig } from 'cypress'

export default defineConfig({
  downloadsFolder: 'test/cypress/downloads',
  fixturesFolder: 'test/cypress/fixtures',
  screenshotsFolder: 'test/cypress/screenshots',
  videosFolder: 'test/cypress/videos',
  supportFolder: 'test/cypress/support',

  pageLoadTimeout: 20000,
  viewportHeight: 1000,
  viewportWidth: 1250,
  numTestsKeptInMemory: 6,
  video: false,

  env: {
    CYPRESS_LOG_ACTIVE: true,
    CYPRESS_DISABLE_MOBILE_TESTS: false,
  },

  chromeWebSecurity: false,

  e2e: {
    baseUrl: 'http://localhost:3000',
    excludeSpecPattern: ['**/utils/**', '**/manual/**'],
    numTestsKeptInMemory: 3,
    specPattern: 'test/cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'test/cypress/support/e2e.ts',
    watchForFileChanges: false,
  },

  // component: {
  //   devServer: {
  //     framework: 'create-react-app',
  //     bundler: 'webpack',
  //   },
  //   supportFile: 'test/cypress/support/component.ts',
  // },
})
