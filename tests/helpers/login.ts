export const login = async (I: CodeceptJS.I) => {
  const loginButtonVisible = await I.grabNumberOfVisibleElements(
    locate('a').withAttr({ href: '/auth/login' }),
  )

  if (!loginButtonVisible) {
    I.say('Already logged in')
    return
  }

  I.say('Log in')
  I.click('Anmelden')
  I.waitForText('Benutzername oder E-Mailadresse', 10)
  I.fillField('Benutzername oder E-Mailadresse', 'dal')
  I.fillField('Passwort', '123456')
  I.click('Anmelden', "button[value='password']")
  I.waitForText('Willkommen dal!', 10)
}
