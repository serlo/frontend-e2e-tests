import { faker } from '@faker-js/faker'

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

Feature('Registration')

Scenario('Register user', ({ I }) => {
  const verificationLink = '#mailDetails > p:nth-child(5) > a:nth-child(2)'

  I.amOnPage('/')
  I.click('Anmelden')
  I.click('Einen neuen Account anlegen')
  I.fillField('E-Mail-Adresse', faker.internet.email())
  I.fillField('Benutzername', faker.internet.userName())
  I.fillField('Passwort', '123456')
  I.click('Account anlegen', '.serlo-button-green')
  if (process.env.FRONTEND_API === 'local') {
    I.amOnPage('http://localhost:4436')
    I.click('Bitte bestätige deine E-Mail-Adresse')
    I.click(verificationLink)
    I.see('Mit deinem Account anmelden')
  }
})
