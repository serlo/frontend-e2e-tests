import { execSync } from 'child_process'

import config from './config'
import {
  deregisterPreCompilePages,
  registerPreCompilePages,
} from './utils/precompile'

const { adminUser, frontendUrl, isCI } = config

function isDevServerRunning() {
  try {
    const processOutput = execSync('ps aux | grep "next dev"').toString()
    const isNextDevServerRunning = processOutput.includes('next dev')
    return isNextDevServerRunning
  } catch (error) {
    return false
  }
}

exports.config = {
  tests: 'tests/**.ts',
  output: './output', // we are not using any artifacts right now, but still need an output directory
  helpers: {
    Playwright: {
      url: frontendUrl,
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
  async bootstrap() {
    if (isDevServerRunning()) {
      console.log('Bootstrap hook started!')
      registerPreCompilePages()
      console.log('Bootstrap hook finished! Ready to run tests.')
    }
  },
  async teardown() {
    if (isDevServerRunning()) {
      console.log('Teardown hook started!')
      deregisterPreCompilePages()
      console.log('Teardown hook finished!')
    }
  },

  plugins: {
    customLocator: {
      enabled: true,
      // Allows data-qa attributes to be selected with $ prefix. E.g
      // [data-qa-quickbar] could be selected with simply I.click('$quickbar').
      attribute: 'data-qa',
    },
    autoLogin: {
      enabled: true,
      saveToFile: false,
      inject: 'login',
      users: {
        admin: {
          login: (I) => {
            I.amOnPage('/')
            I.see('Anmelden')
            I.click('Anmelden')
            I.waitForText('Benutzername oder E-Mailadresse', 10)
            I.fillField('Benutzername oder E-Mailadresse', adminUser)
            I.fillField('Passwort', '123456')
            I.click('Anmelden', "button[value='password']")
            I.waitForText(`Willkommen ${adminUser}!`, 30)
          },
          check: (I) => {
            I.amOnPage('/')
            I.waitForElement(
              `header nav img[title='Benutzer*in ${adminUser}']`,
              15,
            )
          },
          // see https://github.com/codeceptjs/CodeceptJS/issues/1591#issuecomment-480800333
          fetch: () => 'whatever',
          restore: () => {},
        },
      },
    },
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
}
