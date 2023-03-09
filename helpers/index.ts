export function loginAs(I: CodeceptJS.I, username: string) {
  I.amOnPage('/')
  I.see('Anmelden')
  I.click('Anmelden')
  I.fillField('Benutzername oder E-Mailadresse', username)
  I.fillField('Passwort', '123456')
  I.click('Anmelden', '.serlo-button-green')
  I.waitForText(`Willkommen ${username}!`, 10)
}

export function logout(I: CodeceptJS.I) {
  I.amOnPage('/')
  I.click('Benutzer*in')
  I.click('Abmelden')
  I.waitForText('Bis bald!', 10)
  I.see('Anmelden')
}
