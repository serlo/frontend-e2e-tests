const isCI = !!process.env.CI

exports.config = {
  tests: 'tests/**.ts',
  output: './output', // we are not using any artifacts right now, but still need an output directory
  helpers: {
    Playwright: {
      url: 'https://de.serlo-staging.dev',
      restart: 'keep',
      keepBrowserState: true,
      keepCookies: true,
      show: isCI ? false : true,
      ...(isCI
        ? {
            chromium: {
              args: ['--no-sandbox'], // this is needed for github CI to work
            },
          }
        : { browser: 'chromium' }),
    },
  },
  name: 'frontend-e2e-tests',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: false,
    },
  },
}
