import { faker } from '@faker-js/faker'
import config from '../config'
import { loginAs, logout } from '../helpers'

Feature('Registration')

Scenario('User registers successfully', ({ I }) => {
  const username = faker.internet.userName().replaceAll('.', '')
  const verificationLink = '#mailDetails > p:nth-child(5) > a:nth-child(2)'

  I.amOnPage('/')
  I.click('Anmelden')
  I.click('Einen neuen Account anlegen')
  I.fillField('E-Mail-Adresse', faker.internet.exampleEmail())
  I.fillField('Benutzername', username)
  I.fillField('Passwort', '123456')
  I.click('Account anlegen', '.serlo-button-green')

  if (config.shouldRunOnlyLocally) {
    I.amOnPage(config.emailClientUrl)
    I.click('Bitte bestätige deine E-Mail-Adresse')
    I.click(verificationLink)
    // FIXME: debug error that verification link was already used
    I.see('Bestätige deine Mailadresse')
    loginAs(I, username)
    logout(I)
  }
})
