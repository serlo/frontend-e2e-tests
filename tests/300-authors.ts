Feature('Authors')

// expecting user to be logged out before start of tests

// @ts-expect-error login is defined in codecept.config.ts
Before(({ login, I }) => {
  login('admin') // login as admin for now
})

// Articles only for now

Scenario('Open Editor', ({ I }) => {
  I.amOnPage('/74888')
  I.click('Überarbeiten')
  I.waitForText('Speichern', 10)
  I.see('Treibhausgase')
})

Scenario('Saving without changes', ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')
  I.click('Speichern')
  I.waitForText('Bisher hast du nichts geändert')
  I.dontSee('Beschreibe deine Änderungen am Inhalt')
})

/*Scenario('Add Revision and reject', ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')
  I.click("input[placeholder='Titel']")
  I.pressKey('-')
  I.pressKey('T')
  I.pressKey('e')
  I.pressKey('s')
  I.pressKey('t')
  I.click('Speichern')
  I.click('Speichern und reviewen lassen')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen')
  I.click(' dem Speichern dieser Seite')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen')
  I.fillField('label textarea', 'automated-test')
  I.click('Speichern und reviewen lassen')
  I.waitForText('Danke für deine Bearbeitung')
  I.see('Bearbeitungsverlauf')
  I.see('gerade eben')
  I.click('automated-test')
  I.see('Treibhausgase-Test')

  // Reject revision
  I.click('Nicht akzeptieren')
  I.click('Bestätigen')
  I.waitForText('Bearbeitung wurde nicht akzeptiert', 15)
  pause()
})*/

/*Scenario('Reject Revision @current', ({ I }) => {
  // clean up revision
  pause()
})*/

// LocalStorage tests

// Tab Change

// Logout in second Tab…
