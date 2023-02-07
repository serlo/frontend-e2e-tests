Feature('Authors')

// expecting user to be logged out before start of tests

// @ts-expect-error login is defined in codecept.config.ts
Before(({ login, I }) => {
  login('admin') // login as admin for now
})

// Articles only for now
Scenario('Saving without changes', ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')
  I.click('Speichern')
  I.waitForText('Bisher hast du nichts geändert')
  I.dontSee('Beschreibe deine Änderungen am Inhalt')
})

Scenario('Open Editor from article', async ({ I }) => {
  I.amOnPage('/74888')

  // Make sure we see the latest version
  I.refreshPage()

  // only works for 1 level
  const hasRevisions = await tryTo(() => {
    I.see('Zeige neue Bearbeitungen')
  })
  if (hasRevisions) {
    I.click('Zeige neue Bearbeitungen')

    // Select first new revision by title value
    I.click('Diese Bearbeitung anzeigen')

    I.click('Nicht akzeptieren')
    I.click('Bestätigen')
    I.amOnPage('/74888')
  }

  I.click('Überarbeiten')
  I.waitForText('Speichern', 10)
  I.see('Treibhausgase')
})

Scenario('Add Revision and reject', async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')
  I.click("input[placeholder='Titel']")
  I.pressKey('-')
  I.pressKey('T')
  I.pressKey('e')
  I.pressKey('s')
  I.pressKey('t')

  // Randomize script so that revisions are not ignored
  I.type(Math.random().toString())

  I.click('Speichern')
  I.click('Speichern und reviewen lassen')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen')
  I.click(' dem Speichern dieser Seite')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen')
  I.fillField('label textarea', 'automated-test')
  I.click('Speichern und reviewen lassen')

  // Give it some more time
  I.waitForText('Danke für deine Bearbeitung', 10)
  I.see('Bearbeitungsverlauf')

  // I can't predict if it's the one or the other string
  const seeVersion1 = await tryTo(() => {
    I.see('vor einer Weile')
  })
  if (!seeVersion1) {
    I.see('gerade eben')
  }

  I.click('automated-test')
  I.see('Treibhausgase-Test')

  // Reject revision
  I.click('Nicht akzeptieren')
  I.click('Bestätigen')
  I.waitForText('Bearbeitung wurde nicht akzeptiert', 15)
})

/*Scenario('Reject Revision @current', ({ I }) => {
  // clean up revision
  pause()
})*/

// LocalStorage tests

// Tab Change

// Logout in second Tab…
