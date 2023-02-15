import { faker } from '@faker-js/faker'
import { loginAs } from '../codecept.config'
import config from '../config'
import { logout } from './200-login'

Feature('Registration')

Scenario('Successfully register user', ({ I }) => {
  const username = faker.internet.userName().replaceAll('.', '')
  const verificationLink = '#mailDetails > p:nth-child(5) > a:nth-child(2)'

  I.amOnPage('/')
  I.click('Anmelden')
  I.click('Einen neuen Account anlegen')
  I.fillField('E-Mail-Adresse', faker.internet.email())
  I.fillField('Benutzername', username)
  I.fillField('Passwort', '123456')
  I.click('Account anlegen', '.serlo-button-green')
  if (config.shouldRunOnlyLocally) {
    I.amOnPage('http://localhost:4436')
    I.click('Bitte bestätige deine E-Mail-Adresse')
    I.click(verificationLink)
    I.see('Mit deinem Account anmelden')
    loginAs(I, username)
    logout(I)
  }
})

Scenario('Successfully register user', ({ I }) => {
  const username = faker.internet.userName().replaceAll('.', '')
  const verificationLink = '#mailDetails > p:nth-child(5) > a:nth-child(2)'

  I.amOnPage('/')
  I.click('Anmelden')
  I.click('Einen neuen Account anlegen')
  I.fillField('E-Mail-Adresse', faker.internet.email())
  I.fillField('Benutzername', username)
  I.fillField('Passwort', '123456')
  I.click('Account anlegen', '.serlo-button-green')
  if (config.shouldRunOnlyLocally) {
    I.amOnPage('http://localhost:4436')
    I.click('Bitte bestätige deine E-Mail-Adresse')
    I.click(verificationLink)
    I.see('Mit deinem Account anmelden')
    loginAs(I, username)
    logout(I)
  }
})
