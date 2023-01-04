const isCI = !!process.env.CI;

exports.config = {
  tests: "tests/**.js",
  output: "./output",
  helpers: {
    Playwright: {
      url: "https://de.serlo-staging.dev",
      show: isCI ? false : true,
      ...(isCI
        ? {
            chromium: {
              args: ["--no-sandbox"],
            },
          }
        : { browser: "chromium" }),
    },
  },
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
