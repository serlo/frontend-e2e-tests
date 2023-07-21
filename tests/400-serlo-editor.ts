Feature('Serlo Editor')

// @ts-expect-error login is defined in codecept.config.ts
Before(({ login, I }) => {
  login('admin') // login as admin for now
})

Scenario('Basic text interactions', async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')
  I.click('span[data-slate-node="text"]')
  I.type('TESTTESTTEST')
  I.see('TESTTESTTEST')
  for (let i = 0; i < 12; i++) {
    I.pressKey('Backspace')
  }
  I.dontSee('TESTTESTTEST')
})

Scenario('Add new plugins', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  I.click('Füge ein Element hinzu')
  I.pressKey('Enter')
  I.pressKey('Backspace')

  // Only one text plugin visible
  I.see('Write something or add elements with')

  I.click('Füge ein Element hinzu')
  for (let i = 0; i < 3; i++) {
    I.pressKey('ArrowDown')
  }
  // Spoiler
  I.pressKey('Enter')

  I.seeElement('input[placeholder="Titel eingeben"]')

  I.pressKey('/')
  for (let i = 0; i < 4; i++) {
    I.pressKey('ArrowDown')
  }
  // Box
  I.pressKey('Enter')

  I.see('Art der Box')
  I.click('Merke')

  I.see('(optionaler Titel)')
})

Scenario('Adding math formulas', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  // Within plugin-text
  I.pressKey('Backspace')

  I.type('Some text ')
  I.pressKey(['CommandOrControl', 'M'])

  I.see('LaTeX')
  I.type('\\frac12')
  I.pressKey('ArrowRight')
  I.dontSee('LaTeX')

  I.seeElement('span.katex')
})

Scenario('Undo', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.type('Some text')
  I.see('Some text')

  I.click('button[title="Undo"]')

  I.dontSee('Some text')
})

Scenario('Markdown list shortcut', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.dontSeeElement('ul[data-slate-node="element"]')

  I.type('- a list')

  I.seeElement('ul[data-slate-node="element"]')
})

Scenario('Plugin Suggestions Menu', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  //Upload first image

  I.click("input[placeholder='https://example.com/image.png']")

  I.type('https://denkspace.de/zukunftswerk.gif')

  //Click on “Füge ein Element hinzu” to get the menu

  I.click('Füge ein Element hinzu')

  I.click('span[data-slate-node="text"]')

  I.seeElement('div.sc-fbYMXx.dTXjUa') //→ plugin suggestion menu

  //Close menu, when click on plugin or other element
  //Add new text plugin and check

  I.pressKey(['CommandOrControl', 'A'])

  I.pressKey('Backspace') //Close menu with backspace

  I.dontSeeElement('div.sc-fbYMXx.dTXjUa')

  I.click('Füge ein Element hinzu')

  I.seeElement('div.sc-fbYMXx.dTXjUa')

  I.click('div.sc-fbYMXx.dTXjUa:nth-child(1)')

  I.dontSee('div.sc-fbYMXx.dTXjUa')

  I.type('Some text')

  I.see('Some text')

  //search-function text

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('tex')

  I.pressKey('Enter')

  I.type('Some text')

  I.see('Some text')

  //Add new picture plugin and check
  I.click('Füge ein Element hinzu')

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(2)')

  I.see('Bild-URL') //→ because we filled the first picture → for multimedia contetend we have to fill this picture too

  I.click("input[placeholder='https://example.com/image.png']")

  I.type('https://denkspace.de/zukunftswerk.gif')

  //search-function picture

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('Bild')

  I.pressKey('Enter')

  I.see('Bild-URL') //→ because we filled the first picture → for multimedia contetend we have to fill this picture too

  I.click("input[placeholder='https://example.com/image.png']")

  I.type('https://denkspace.de/zukunftswerk.gif')

  //Add new multi-media plugin an check

  I.click('Füge ein Element hinzu')

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(3)')

  I.see('Bild-URL')

  I.click('div.sc-jfvxQR.eJQLuu')
  //Add new spoiler

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(4)')

  I.seeElement('div.sc-evzXkX.kCakgO')

  //search-function spoiler

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('spoi')

  I.pressKey('Enter')

  I.seeElement('div.sc-evzXkX.kCakgO')

  //Add new box

  I.click('div.sc-jfvxQR.eJQLuu')

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(5)')

  I.see('Art der Box')

  //search-function box

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('bo')

  I.pressKey('Enter')

  I.see('Art der Box')

  //Add new table

  I.click('div.sc-jfvxQR.eJQLuu')

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(6)')

  I.seeElement('table.serlo-table.mb-8')

  //search-function table

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('tab')

  I.pressKey('Enter')

  I.seeElement('table.serlo-table.mb-8')

  I.click('div.sc-jfvxQR.eJQLuu')

  //Add new serlo.org content

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(7)')

  I.see('Serlo ID')

  //search-function serlo.org content

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('ser')

  I.pressKey('Enter')

  I.see('Serlo ID')

  I.click('div.sc-jfvxQR.eJQLuu')

  //Add new terms und equations

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(8)')

  I.see('Neue Gleichung hinzufügen')

  //search-function serlo.org content

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('gle')

  I.pressKey('Enter')

  I.see('Neue Gleichung hinzufügen')

  I.click('div.sc-jfvxQR.eJQLuu')

  //Add new GeoGebra

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(9)')

  I.see('GeoGebra Materials URL oder ID')

  //search-function GeoGebra

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('geo')

  I.pressKey('Enter')

  I.see('GeoGebra Materials URL oder ID')

  //Add new code plugin

  I.click('div.sc-jfvxQR.eJQLuu')

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(10)')

  I.seeElement('div.mt-2.flex.justify-between')

  //search-function code plugin

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('cod')

  I.pressKey('Enter')

  I.seeElement('div.mt-2.flex.justify-between')

  //Add new video

  I.click('div.sc-jfvxQR.eJQLuu')

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(11)')

  I.see('Video URL')

  //search-function video

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('vid')

  I.pressKey('Enter')

  I.see('Video URL')

  //Add new jump mark

  I.click('div.sc-jfvxQR.eJQLuu')

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(12)')

  I.seeElement('input[placeholder="Name der Sprungmarke"]')

  //search-function jump mark

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('spr')

  I.pressKey('Enter')

  I.seeElement('input[placeholder="Name der Sprungmarke"]')

  //Add new Editor Stage

  I.click('div.sc-jfvxQR.eJQLuu')

  I.click('div.sc-gUJyNl.gsCVtz:nth-child(13)')

  I.see('Experimental Import')

  I.click('div.sc-jfvxQR.eJQLuu')

  //search-function Editor Stge

  I.click('div.sc-jfvxQR.eJQLuu')

  I.type('edi')

  I.pressKey('Enter')

  I.see('Experimental Import')
})

Scenario('images in exercises', async ({ I }) => {
  I.amOnPage('/mathe/54749/54749')

  I.see('Aufgaben zu Kreisen und Kreisteilen')

  I.click('Überarbeiten')

  I.see('Speichern')

  I.click('Teilaufgabe hinzufügen')

  I.see('Auswahlaufgabe')

  I.click('Auswahlaufgabe')

  I.click("Stimmt's?")

  I.see('Multiple Choice')
})
