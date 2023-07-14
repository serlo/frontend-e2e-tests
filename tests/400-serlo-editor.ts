Feature('Serlo Editor')

Scenario('Basic text interactions', async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')
  I.click('span[data-slate-node="text"]')
  const testString = 'TESTTESTTEST'
  I.type(testString)
  I.see(testString)
  for (let i = 0; i < testString.length; i++) {
    I.pressKey('Backspace')
  }
  I.dontSee(testString)
})

Scenario('Add new plugins', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  I.click('Füge ein Element hinzu')
  I.pressKey('Enter')
  I.pressKey('Backspace')

  // Only one text plugin visible
  I.see('Schreib etwas oder füge')

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

Scenario('Delete text plugin with keyboard', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  // When visting the page, a new text plugin with no content is already there. Now we create a second one.
  I.click('Füge ein Element hinzu')

  // Delete two text plugins with backspace. 3 backspaces in total are needed to delete the / in the beginning too
  I.pressKey('Backspace')
  I.pressKey('Backspace')
  I.pressKey('Backspace')
  I.dontSee('Schreib etwas oder füge')

  I.click('Füge ein Element hinzu')
  // Removes the slash and not the text plugin
  I.pressKey('Backspace')

  // Only one empty text plugin should be visible
  I.see('Schreib etwas oder füge')

  // Now delete the text plugin with the delete key
  I.pressKey('Delete')
  I.dontSee('Schreib etwas oder füge')
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

Scenario('Undo via keyboard', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.type('Some text')
  I.see('Some text')

  I.pressKey(['CommandOrControl', 'z'])

  I.dontSee('Some text')
})

Scenario('Redo', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.type('Some text')

  I.see('Some text')

  I.click('button[title="Undo"]')

  I.dontSee('Some text')

  I.click('button[title="Redo"]')

  I.see('Some text')
})

Scenario('Redo via keyboard', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.type('Some text')

  I.see('Some text')

  // UNDO
  I.pressKey(['CommandOrControl', 'z'])

  I.dontSee('Some text')

  // REDO
  // ! For some reason, the first redo does not work. The second one does. If
  // one puts a pause() here and runs the command only once through the
  // interactive shell , it works just as fine as clicking the button.
  // Therefore, I thought the Ctrl+Y was maybe happening too quickly after the
  // Ctrl+Z, but even with I.wait(1) two executions were needed.
  I.pressKey(['CommandOrControl', 'y'])
  I.pressKey(['CommandOrControl', 'y'])

  I.see('Some text')
})

Scenario('Markdown list shortcut', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.dontSeeElement('ul[data-slate-node="element"]')

  I.type('- a list')

  I.seeElement('ul[data-slate-node="element"]')
})

Scenario('Copy/cut/paste text', async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')

  I.click('span[data-slate-node="text"]')

  I.type(' ')

  I.type('TESTTESTTEST')

  I.see('TESTTESTTEST')

  for (let i = 0; i < 12; i++) {
    I.pressKey(['Shift', 'LeftArrow'])
  }

  I.pressKey(['CommandOrControl', 'C'])

  I.pressKey('Backspace')

  I.dontSee('TESTTESTTEST')

  I.pressKey(['CommandOrControl', 'V'])

  I.see('TESTTESTTEST')

  for (let i = 0; i < 12; i++) {
    I.pressKey('Backspace')
  }

  I.type('CUTCUTCUT')

  I.see('CUTCUTCUT')

  for (let i = 0; i < 9; i++) {
    I.pressKey(['Shift', 'LeftArrow'])
  }

  I.pressKey(['CommandOrControl', 'X'])

  I.dontSee('CUTCUTCUT')

  I.pressKey(['CommandOrControl', 'V'])

  I.see('CUTCUTCUT')
})

Scenario('Keyboard Toggle on and off', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.type('Some text')

  I.see('Some text')

  I.pressKey(['CommandOrControl', 'A'])

  //Toggle bold on & off

  I.pressKey(['CommandOrControl', 'B'])

  I.seeElement({ css: 'b' })

  I.pressKey(['CommandOrControl', 'B'])

  I.dontSeeElement({ css: 'b' })

  //Toggle Italic on & off

  I.pressKey(['CommandOrControl', 'I'])

  I.seeElement({ css: 'i' })

  I.pressKey(['CommandOrControl', 'I'])

  I.dontSeeElement({ css: 'i' })

  //Toggle Link on

  I.pressKey(['CommandOrControl', 'K'])

  I.type('https://de.serlo.org/mathe/1541/hypotenuse')

  I.click('div.mt-2.text-lg.text-gray-800')

  I.click('Some text')

  I.see('Hypotenuse')

  I.seeElement({ css: '.serlo-editor-hacks a' })

  //Toggle Link off

  I.pressKey(['CommandOrControl', 'A'])

  I.pressKey(['CommandOrControl', 'K'])

  I.dontSeeElement({ css: '.serlo-editor-hacks a' })

  //Toggle Math on

  I.pressKey(['CommandOrControl', 'A'])
  I.pressKey('Backspace')

  I.pressKey(['CommandOrControl', 'M'])

  I.see('LaTeX')
  I.type('\\frac12 test')
  I.pressKey('ArrowRight')
  I.dontSee('LaTeX')

  I.seeElement('span.katex')

  //Toggle Math off

  I.pressKey(['Shift', 'LeftArrow'])

  I.pressKey(['CommandOrControl', 'A'])

  I.pressKey(['CommandOrControl', 'M'])

  I.dontSee('test')

  //Toggle unordered list on

  I.type('- Some text')

  I.see('Some text', 'ul')

  //Toggle unordered list off

  for (let i = 0; i < 9; i++) {
    I.pressKey('LeftArrow')
  }

  I.pressKey('Backspace')

  I.dontSee('Some text', 'ul')

  //Clear
  I.pressKey(['CommandOrControl', 'A'])

  I.pressKey('Backspace')

  //Toogle H1 on

  I.type('# Some text')

  I.see('Some text', 'h1')

  //Toggle H1 off

  for (let i = 0; i < 9; i++) {
    I.pressKey('LeftArrow')
  }

  I.type('# ')

  I.dontSee('Some text', 'h1')

  //Toggle H2 on

  I.type('## ')

  I.see('Some text', 'h2')

  //Toggle H2 off

  for (let i = 0; i < 9; i++) {
    I.pressKey('LeftArrow')
  }

  I.type('## ')

  I.dontSee('Some text', 'h2')

  //Toggle H3 on

  I.type('### ')

  I.see('Some text', 'h3')

  //Toggle H3 off

  for (let i = 0; i < 9; i++) {
    I.pressKey('LeftArrow')
  }

  I.type('### ')

  I.dontSee('Some text', 'h3')
})

Scenario('Unordered list shortcuts', async ({ I }) => {
  //Indent/un-indent list
  //At the moment, I am unable to indent a bullet list within the text. Therefore, I cannot test this case here.

  //Add new list item on enter
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.type('- Some text')

  I.see('Some text', 'ul')

  I.pressKey('Enter')

  I.type('Some more text')

  I.see('Some more text', 'ul')

  //Exit the list on double enter

  I.pressKey('Enter')

  I.pressKey('Enter')

  I.type('Exit the list')

  I.dontSee('Exit the list', 'ul')

  //Clear Text in list
  I.pressKey(['CommandOrControl', 'A'])

  I.pressKey('Backspace')

  I.seeElement({ css: '.serlo-editor-hacks ul:not(.unstyled-list)' })

  //Remove empty list item on backspace

  I.pressKey('Backspace')

  I.dontSeeElement({ css: '.serlo-editor-hacks ul:not(.unstyled-list)' })
})

Scenario('Toolbar Toggle on and off', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.type('Some text')

  //Toggle Bold on

  I.pressKey(['CommandOrControl', 'A'])

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(1)')

  I.seeElement({ css: 'b' })

  //Toggle Bold off

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(1)')

  I.dontSeeElement({ css: 'b' })

  //Toggle italic on

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(2)')

  I.seeElement({ css: 'i' })

  //Toggle italic off

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(2)')

  I.dontSeeElement({ css: 'i' })

  //Toggle Code on

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(9)')

  I.see('Some text', 'code')

  I.seeElement({ css: '.serlo-editor-hacks code' })

  //Toggle Code off

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(9)')

  I.dontSeeElement({ css: '.serlo-editor-hacks code' })

  //Toggle Link on

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(3)')

  I.type('https://de.serlo.org/mathe/1541/hypotenuse')

  I.click('div.mt-2.text-lg.text-gray-800')

  I.seeElement({ css: '.serlo-editor-hacks a' })

  I.click('Some text')

  I.see('Hypotenuse')

  //Toggle Link off

  I.click('Some text')

  I.click(
    'button.serlo-button-editor-secondary.serlo-tooltip-trigger.ml-2.h-10.w-10',
  )

  I.dontSeeElement({ css: '.serlo-editor-hacks a' })

  //Toggle unordered list on

  I.pressKey(['CommandOrControl', 'A'])

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(7)')

  I.see('Some text', 'ul')

  //Toggle unordered list off

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(7)')

  I.dontSee('Some text', 'ul')

  //Toggle ordered list on

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(6)')

  I.see('Some text', 'ol')

  //Toggle unordered list off

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(6)')

  I.dontSeeElement({ css: '.serlo-editor-hacks ol' })

  //Toggle H1 on

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(4)')

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(1)')

  I.see('Some text', 'h1')

  //Toggle H1 off

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(4)')

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(1)')

  I.dontSee('Some text', 'h1')

  //Toggle H2 on

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(4)')

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(2)')

  I.see('Some text', 'h2')

  //Toggle H2 off

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(4)')

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(2)')

  I.dontSee('Some text', 'h2')

  //Toggle H3 on

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(4)')

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(3)')

  I.see('Some text', 'h3')

  //Toggle H3 off

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(4)')

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(3)')

  I.dontSee('Some text', 'h3')

  //Color change orange

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(5)')

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(4)')

  I.seeElement('span[style="color: rgb(255, 102, 0);"]')

  //Color reset

  I.pressKey(['CommandOrControl', 'A'])

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(5)')

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(1)')

  I.dontSeeElement('span[style="color: rgb(255, 102, 0);"]')

  //Toggle Math on

  I.pressKey(['CommandOrControl', 'A'])

  I.pressKey('Backspace')

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(8)')

  I.see('LaTeX')

  I.type('\\frac12')

  I.pressKey('ArrowRight')

  I.dontSee('LaTeX')

  I.seeElement('span.katex')

  //Toggle Math off

  I.pressKey('ArrowLeft')

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(8)')

  I.dontSeeElement('span.katex')
})

Scenario('Save changes', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('h1')

  I.type('Test save changes')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.type('Some text')

  I.see('Some text')

  I.click('button.serlo-button-green.ml-2')

  I.see('Beschreibe deine Änderungen am Inhalt')

  // Use class instead of text because text is super long and not reliable
  I.click('.license-wrapper')

  I.fillField('label textarea', 'I wrote some Text')
  I.click('button.serlo-button.ml-2.serlo-button-green')
  I.dontSee('Bitte alle Pflichtfelder ausfüllen')
})
