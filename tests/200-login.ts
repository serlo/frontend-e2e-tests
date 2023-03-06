Feature('Login')

Scenario('Login user', ({ I }) => {
  I.amOnPage('/')
  I.see('Anmelden')
  I.click('Anmelden')
  I.fillField('Benutzername oder E-Mailadresse', 'dal')
  I.fillField('Passwort', '123456')
  I.click('Anmelden', '.serlo-button-green')
  I.waitForText('Willkommen dal!', 10)
})

Scenario('Logout user', ({ I }) => {
  I.amOnPage('/')
  I.click('Benutzer*in')
  I.click('Abmelden')
  I.waitForText('Bis bald!', 10)
  I.see('Anmelden')
})

// make sure user is logged out at the end of the tests
