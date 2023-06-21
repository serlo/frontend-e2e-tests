Feature('Serlo Editor')

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
  I.click('div.sc-gswNZR.dvlXPI')

  I.click('Füge ein Element hinzu')

  I.seeElement('div.sc-ilhmMj.hKPBD') //→ plugin suggestion menu

  //Close menu, when click on plugin or other element
  //Add new text plugin and check

  I.click('div.sc-gswNZR.dvlXPI')

  I.dontSee('div.sc-jWgTtR.ksNJmX')

  I.click('Füge ein Element hinzu')

  I.seeElement('div.sc-ilhmMj.hKPBD')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(1)')

  I.dontSee('div.sc-jWgTtR.ksNJmX')

  I.type('Some text')

  I.see('Some text')

  //Add new picture plugin and check
  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(2)')

  I.see('Image URL') //→ because we filled the first picture → for multimedia contetend we have to fill this picture too

  I.click("input[placeholder='https://example.com/image.png']")

  I.type('https://denkspace.de/zukunftswerk.gif')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new multi-media plugin an check

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(3)')

  I.see('Image URL')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new spoiler

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(4)')

  I.seeElement('div.sc-eJDSGI.hFwOSO')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new box

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(5)')

  I.see('Art der Box')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new table

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(6)')

  I.seeElement('table.serlo-table.mb-8')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new serlo.org content

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(7)')

  I.see('Serlo ID')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new terms und equations

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(8)')

  I.see('Neue Gleichung hinzufügen')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new GeoGebra

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(9)')

  I.see('GeoGebra Materials URL oder ID')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new code plugin

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(10)')

  I.seeElement('div.mt-2.flex.justify-between')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new video

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(11)')

  I.see('Video URL')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new jump mark

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(12)')

  I.seeElement('input[placeholder="Name der Sprungmarke"]')

  I.click('div.sc-gswNZR.dvlXPI')

  //Add new paste Hack

  I.click('Füge ein Element hinzu')

  I.click('div.sc-fmZqYP.jrCWCc:nth-child(13)')

  I.see('Experimental Import')
})
