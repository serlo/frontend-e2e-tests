Feature('Authors')

Before(({ login }) => {
  login('admin') // login as admin for now
})

// Articles only for now

Scenario('Open Editor', ({ I }) => {
  I.amOnPage('/74888')
  I.click('Überarbeiten')
  I.see('Speichern')
  I.see('Treibhausgase')
})

Scenario('Saving without changes', ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')
  I.click('Speichern')
  I.waitForText('Bisher hast du nichts geändert')
  I.dontSee('Beschreibe deine Änderungen am Inhalt')
})

Scenario('Add Revision', ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888/248633')
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
})
