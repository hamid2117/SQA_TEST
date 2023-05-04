const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://demoqa.com/',
    chromeWebSecurity: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
})
