import { loginAs } from '../helpers'

Feature('Login')

Scenario('Login user', ({ I }) => {
  loginAs(I, 'dal')
})

Scenario('Logout user', ({ I }) => {
  logout(I)
})

export function logout(I: CodeceptJS.I) {
  I.amOnPage('/')
  I.click('Benutzer*in')
  I.click('Abmelden')
  I.waitForText('Bis bald!', 10)
  I.see('Anmelden')
}
