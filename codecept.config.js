exports.config = {
  tests: "tests/**.js",
  output: "./output",
  helpers: {
    Playwright: {
      url: "https://de.serlo-staging.dev",
      show: false,
      chromium: {
        args: ["--no-sandbox"],
      },
    },
  },
  bootstrap: null,
  mocha: {},
  name: "frontend-e2e-tests",
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
