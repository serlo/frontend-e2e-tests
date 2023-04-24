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
    // Menu takes time to load
    I.wait(3)
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
  I.pressKey('Space')

  // Randomize script so that revisions are not ignored
  I.type(Math.random().toString())

  I.click('Speichern')
  I.click('Speichern und reviewen lassen')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen', 10)

  // Use class instead of text because text is super long and not reliable
  I.click('.license-wrapper')
  I.click('Speichern und reviewen lassen')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen', 10)

  I.fillField('label textarea', 'automated-test')
  I.click('Speichern und reviewen lassen')
  I.dontSee('Bitte alle Pflichtfelder ausfüllen')

  I.waitForText('Danke für deine Bearbeitung', 60)
  I.see('Bearbeitungsverlauf')

  // I can't predict if it's the one or the other string
  const seeVersion1 = await tryTo(() => {
    I.see('vor einer Weile')
  })
  if (!seeVersion1) {
    I.see('gerade eben')
  }

  I.click('automated-test')
  // For local testing, it's slow
  I.waitForText('Treibhausgase-Test', 30)

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

Scenario('Sort taxonomy entities', async ({ I }) => {
  I.amOnPage('/taxonomy/term/sort/entities/75211')
  I.see('Artikel')
  I.see('Codierungen')

  I.see('Kurse')
  I.see('Webseite selbst erstellen')

  I.see('Bereiche')
  I.see('Technische Informatik')
})

Scenario('Sort exercise folder', async ({ I }) => {
  I.amOnPage('/taxonomy/term/sort/entities/23869')

  I.see('Aufgaben')
  I.see('(1) Aufgabe mit Teilaufgaben:')
  I.see('(20)')
})

Scenario("Switching tabs shouldn't lose work", async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')
  I.click("input[placeholder='Titel']")
  I.pressKey('-')
  I.pressKey('T')
  I.pressKey('e')
  I.pressKey('s')
  I.pressKey('t')

  I.seeInField("input[placeholder='Titel']", 'Treibhausgase-Test')

  I.openNewTab()
  I.wait(2)
  I.closeCurrentTab()

  I.wait(2)

  I.seeInField("input[placeholder='Titel']", 'Treibhausgase-Test')
})
