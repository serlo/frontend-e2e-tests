
export function loginAs(I: CodeceptJS.I, username: string) {
    I.amOnPage('/')
    I.see('Anmelden')
    I.click('Anmelden')
    I.fillField('Benutzername oder E-Mailadresse', username)
    I.fillField('Passwort', '123456')
    I.click('Anmelden', '.serlo-button-green')
    I.waitForText(`Willkommen ${username}!`, 10)
  }