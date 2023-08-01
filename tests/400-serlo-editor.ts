Feature('Serlo Editor')

// Fixes warning "Popup already exists and was not closed. Popups must always be
// closed by calling either I.acceptPopup() or I.cancelPopup()"
Before(async ({ I }) => {
  I.executeScript(() => {
    window.onbeforeunload = null
  })
  I.refreshPage()
})

Scenario('Basic text interactions', async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')

  I.clickByQaClassName('plugin:text-editor')

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
  I.clickByQaClassName('add-new-plugin-row-button')
  I.pressKey('Enter')
  I.pressKey('Backspace')

  // Only one text plugin visible
  I.see('Schreib etwas oder füge')

  I.clickByQaClassName('add-new-plugin-row-button')
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

Scenario('Close plugin selection modal', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  I.click('Füge ein Element hinzu')
  const textPluginDescription =
    'Schreibe Text und Matheformeln, und formatiere sie.'
  I.see(textPluginDescription)

  I.pressKey('Escape')
  // Modal should be closed
  I.dontSee(textPluginDescription)

  // Open modal again
  I.type('/')
  I.see(textPluginDescription)

  // focus something different by clicking outside of the modal, in this
  // instance into the quickbar
  const quickbar = 'input[placeholder*="Suche"]'
  I.click(quickbar)
  // Modal should now be closed
  I.dontSee(textPluginDescription)
})

Scenario('Add plugin via slash command', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  // ensure there is no table yet
  I.dontSeeElement('.serlo-table')
  I.clickByQaClassName('add-new-plugin-row-button')
  I.type('Tabelle')
  I.pressKey('Enter')

  I.seeElement('.serlo-table')
})

Scenario('Delete text plugin with keyboard', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  // When visting the page, a new text plugin with no content is already there.
  // Now we create a second one.
  I.clickByQaClassName('add-new-plugin-row-button')
  // Delete two text plugins. First one with delete, the other one with
  // backspace. The first backspace is needed to delete the / in the beginning
  // too
  I.pressKey('Backspace')
  I.pressKey('Delete')
  I.pressKey('Backspace')
  I.dontSee('Schreib etwas oder füge')

  I.clickByQaClassName('add-new-plugin-row-button')
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

  I.clickByQaClassName('add-new-plugin-row-button')

  // Within text plugin to delete slash
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

  I.clickByQaClassName('add-new-plugin-row-button')

  I.pressKey('Backspace')

  I.type('Some text')
  I.see('Some text')

  I.click('button[title="Undo"]')

  I.dontSee('Some text')
})

Scenario('Undo via keyboard', async ({ I }) => {
  const keyCombos = {
    windowsAndLinux: ['control', 'z'],
    mac: ['command', 'z'],
  }

  for (const [platform, keys] of Object.entries(keyCombos)) {
    I.say(`Checking undo keyboard shortcut for '${platform}'`)
    I.amOnPage('/entity/create/Article/1377')

    I.clickByQaClassName('add-new-plugin-row-button')

    I.pressKey('Backspace')

    I.type('Some text')
    I.see('Some text')

    I.pressKey(keys)

    I.dontSee('Some text')
  }
})

/**
 * Most of the input of the editor happens within the editor contenteditable
 * div. However, there are some input fields whose undo/redo behavior could
 * function differently because we have one global undo/redo handler and the
 * browser also natively handles it unless we specifically overwrite the behavior.
 * Therefore, we want to ensure that we never do 2 undos when ctrl+z is pressed.
 */
Scenario(
  'Undo via keyboard in input field for article heading',
  async ({ I }) => {
    const keyCombos = {
      windowsAndLinux: ['control', 'z'],
      mac: ['command', 'z'],
    }

    for (const [platform, keys] of Object.entries(keyCombos)) {
      I.say(`Checking undo keyboard shortcut for '${platform}'`)

      I.amOnPage('/entity/create/Article/1377')

      const articleHeadingInput = 'input[placeholder="Titel"]'
      I.click(articleHeadingInput)

      const firstWord = 'Some '
      I.type(firstWord)
      I.wait(2)

      const secondWord = 'Text'
      I.type(secondWord)

      I.seeInField(articleHeadingInput, `${firstWord}${secondWord}`)

      I.pressKey(keys)
      I.dontSeeInField(articleHeadingInput, `${firstWord}${secondWord}`)
      I.dontSeeInField(articleHeadingInput, `${secondWord}`)
      I.seeInField(articleHeadingInput, firstWord)

      I.pressKey(keys)
      I.dontSeeInField(articleHeadingInput, `${firstWord}${secondWord}`)
      I.dontSeeInField(articleHeadingInput, firstWord)
    }
  },
)

Scenario(
  'Undo via keyboard in input field of picture plugin',
  async ({ I }) => {
    const keyCombos = {
      windowsAndLinux: ['control', 'z'],
      mac: ['command', 'z'],
    }

    for (const [platform, keys] of Object.entries(keyCombos)) {
      I.say(`Checking undo keyboard shortcut for '${platform}'`)

      // No need to create the image plugin first as the multimedia plugin at the
      // beginning of each page already contains one
      const imagePluginUrlInput =
        'input[placeholder="https://example.com/image.png"]'

      I.click(imagePluginUrlInput)

      const firstWord = 'Some '
      I.type(firstWord)
      I.wait(2)

      const secondWord = 'Text'
      I.type(secondWord)

      I.seeInField(imagePluginUrlInput, `${firstWord}${secondWord}`)

      I.pressKey(keys)
      I.dontSeeInField(imagePluginUrlInput, `${firstWord}${secondWord}`)
      I.dontSeeInField(imagePluginUrlInput, `${secondWord}`)
      I.seeInField(imagePluginUrlInput, firstWord)

      I.pressKey(keys)
      I.dontSeeInField(imagePluginUrlInput, `${firstWord}${secondWord}`)
      I.dontSeeInField(imagePluginUrlInput, firstWord)
    }
  },
)

Scenario('Redo', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.clickByQaClassName('add-new-plugin-row-button')

  I.pressKey('Backspace')

  I.type('Some text')

  I.see('Some text')

  I.click('button[title="Undo"]')

  I.dontSee('Some text')

  I.click('button[title="Redo"]')

  I.see('Some text')
})

Scenario('Redo via keyboard', async ({ I }) => {
  const keyCombos = {
    windowsAndLinux: {
      UNDO: ['control', 'z'],
      REDO: ['control', 'y'],
    },
    mac: {
      UNDO: ['command', 'z'],
      REDO: ['command', 'y'],
    },
  }

  for (const [platform, keys] of Object.entries(keyCombos)) {
    I.say(`Checking redo keyboard shortcut for '${platform}'`)

    I.amOnPage('/entity/create/Article/1377')

    I.clickByQaClassName('add-new-plugin-row-button')

    I.pressKey('Backspace')

    I.type('Some text')

    I.see('Some text')

    I.pressKey(keys.UNDO)

    I.dontSee('Some text')

    // ! For some reason, the first redo does not work. The second one does. If
    // one puts a pause() here and runs the command only once through the
    // interactive shell , it works just as fine as clicking the button.
    // Therefore, I thought the Ctrl+Y was maybe happening too quickly after the
    // Ctrl+Z, but even with I.wait(1) inbetween, two executions were needed.
    I.pressKey(keys.REDO)
    I.pressKey(keys.REDO)

    I.see('Some text')
  }
})

Scenario('Redo in editor input field via keyboard', async ({ I }) => {
  const keyCombos = {
    windowsAndLinux: {
      UNDO: ['control', 'z'],
      REDO: ['control', 'y'],
    },
    mac: {
      UNDO: ['command', 'z'],
      REDO: ['command', 'y'],
    },
  }

  for (const [platform, keys] of Object.entries(keyCombos)) {
    I.say(`Checking redo keyboard shortcut for '${platform}'`)

    I.amOnPage('/entity/create/Article/1377')

    const articleHeadingInput = { xpath: '//input[@placeholder="Titel"]' }
    I.click(articleHeadingInput)

    const firstWord = 'Some '
    I.type(firstWord)
    I.wait(2)

    const secondWord = 'Text'
    I.type(secondWord)
    I.seeInField(articleHeadingInput, `${firstWord}${secondWord}`)

    I.pressKey(keys.UNDO)
    I.dontSeeInField(articleHeadingInput, `${firstWord}${secondWord}`)
    I.dontSeeInField(articleHeadingInput, `${secondWord}`)
    I.seeInField(articleHeadingInput, firstWord)

    I.pressKey(keys.REDO)
    I.seeInField(articleHeadingInput, `${firstWord}${secondWord}`)
  }
})

Scenario('Markdown list shortcut', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.clickByQaClassName('add-new-plugin-row-button')

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

  I.clickByQaClassName('add-new-plugin-row-button')
  I.pressKey('Backspace')
  I.type('Some text')
  I.see('Some text')

  I.pressKey(['CommandOrControl', 'A'])

  // Toggle bold on
  I.say('Toggle bold on')
  I.pressKey(['CommandOrControl', 'B'])
  I.seeElement({ css: 'b' })

  // Toggle bold off
  I.say('Toggle bold off')
  I.pressKey(['CommandOrControl', 'B'])
  I.dontSeeElement({ css: 'b' })

  // Toggle Italic on
  I.say('Toggle italic on')
  I.pressKey(['CommandOrControl', 'I'])
  I.seeElement({ css: 'i' })

  // Toggle Italic off
  I.say('Toggle italic off')
  I.pressKey(['CommandOrControl', 'I'])
  I.dontSeeElement({ css: 'i' })

  // Toggle Link on
  I.say('Toggle link on')
  I.pressKey(['CommandOrControl', 'K'])
  I.type('https://de.serlo.org/mathe/1541/hypotenuse')
  I.click('div.mt-2.text-lg.text-gray-800')
  I.click('Some text')
  I.see('Hypotenuse')
  I.seeElement({ css: '.serlo-editor-hacks a' })

  // Toggle Link off
  I.say('Toggle link off')
  I.pressKey(['CommandOrControl', 'A'])
  I.pressKey(['CommandOrControl', 'K'])
  I.dontSeeElement({ css: '.serlo-editor-hacks a' })

  // Clear link
  I.pressKey(['CommandOrControl', 'A'])
  I.pressKey('Backspace')

  // Toggle Math on
  I.say('Toggle math on')
  I.pressKey(['CommandOrControl', 'M'])
  I.see('LaTeX')
  I.type('\\frac12 test42')
  I.pressKey('ArrowRight')
  I.dontSee('LaTeX')
  I.seeElement('span.katex')

  // Remove Math Element
  I.say('Remove math element')
  I.pressKey(['CommandOrControl', 'A'])
  I.pressKey('Backspace')
  I.dontSeeElement('span.katex')

  // Toggle unordered list on
  I.say('Toggle unordered list on')
  I.type('- Some text')
  I.see('Some text', 'ul')

  // Toggle unordered list off
  I.say('Toggle unordered list off by deleting hyphen')
  for (let i = 0; i < 9; i++) {
    I.pressKey('LeftArrow')
  }
  I.pressKey('Backspace')
  I.dontSee('Some text', 'ul')

  // Clear remnants of the list
  I.pressKey(['CommandOrControl', 'A'])
  I.pressKey('Backspace')

  // Toggle H1 on
  I.say('Toggle H1 on')
  I.type('# Some text')
  I.see('Some text', 'h1')

  // Toggle H1 off
  I.say('Toggle H1 off')
  for (let i = 0; i < 9; i++) {
    I.pressKey('LeftArrow')
  }
  I.type('# ')
  I.dontSee('Some text', 'h1')

  // Toggle H2 on
  I.say('Toggle H2 on')
  I.type('## ')
  I.see('Some text', 'h2')

  // Toggle H2 off
  I.say('Toggle H2 off')
  for (let i = 0; i < 9; i++) {
    I.pressKey('LeftArrow')
  }
  I.type('## ')
  I.dontSee('Some text', 'h2')

  // Toggle H3 on
  I.say('Toggle H3 on')
  I.type('### ')
  I.see('Some text', 'h3')

  // Toggle H3 off
  I.say('Toggle H3 off')
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

  I.clickByQaClassName('add-new-plugin-row-button')

  I.pressKey('Backspace')

  I.type('- Some text')

  I.see('Some text', 'ul')

  I.pressKey('Enter')

  I.type('Some more text')

  I.see('Some more text', 'ul')

  // Exit the list on double enter

  I.pressKey('Enter')

  I.pressKey('Enter')

  I.type('Exit the list')

  I.dontSee('Exit the list', 'ul')

  // Clear Text in list
  I.pressKey(['CommandOrControl', 'A'])

  I.pressKey('Backspace')

  I.seeElement({
    css: '.serlo-editor-hacks div[data-slate-editor="true"] ul:not(.unstyled-list)',
  })

  // Remove empty list item on backspace

  I.pressKey('Backspace')

  I.dontSeeElement({
    css: '.serlo-editor-hacks div[data-slate-editor="true"] ul:not(.unstyled-list)',
  })
})

Scenario('Toolbar Toggle on and off', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.clickByQaClassName('add-new-plugin-row-button')

  I.pressKey('Backspace')

  I.type('Some text')

  // Toggle Bold on

  I.say('Toggle bold on')
  I.pressKey(['CommandOrControl', 'A'])
  I.clickByQaClassName('plugin-toolbar-button-fett')
  I.seeElement({ css: 'b' })

  // Toggle Bold off

  I.say('Toggle bold off')
  I.clickByQaClassName('plugin-toolbar-button-fett')
  I.dontSeeElement({ css: 'b' })

  // Toggle italic on
  I.say('Toggle italic on')
  I.clickByQaClassName('plugin-toolbar-button-kursiv')
  I.seeElement({ css: 'i' })

  // Toggle italic off
  I.say('Toggle italic off')
  I.clickByQaClassName('plugin-toolbar-button-kursiv')
  I.dontSeeElement({ css: 'i' })

  // Toggle Code on
  I.say('Toggle code on')
  I.clickByQaClassName('plugin-toolbar-button-code')
  I.see('Some text', 'code')
  I.seeElement({ css: '.serlo-editor-hacks code' })

  // Toggle Code off
  I.say('Toggle code off')
  I.clickByQaClassName('plugin-toolbar-button-code')
  I.dontSeeElement({ css: '.serlo-editor-hacks code' })

  // Toggle Link on
  I.say('Toggle link on')
  I.clickByQaClassName('plugin-toolbar-button-link')
  I.type('https://de.serlo.org/mathe/1541/hypotenuse')
  I.click('div.mt-2.text-lg.text-gray-800')
  I.seeElement({ css: '.serlo-editor-hacks a' })

  I.click('Some text')
  I.see('Hypotenuse')

  // Toggle Link off

  I.say('Toggle link off')
  I.click('Some text')
  I.click(
    'button.serlo-button-editor-secondary.serlo-tooltip-trigger.ml-2.h-10.w-10',
  )
  I.dontSeeElement({ css: '.serlo-editor-hacks a' })

  // Toggle unordered list on
  I.say('Toggle unordered list on')
  I.pressKey(['CommandOrControl', 'A'])
  I.clickByQaClassName('plugin-toolbar-button-aufzählung')
  I.see('Some text', 'ul')

  // Toggle unordered list off
  I.say('Toggle unordered list off')
  I.clickByQaClassName('plugin-toolbar-button-aufzählung')
  I.dontSee('Some text', 'ul')

  // Toggle ordered list on
  I.say('Toggle ordered list on')
  I.clickByQaClassName('plugin-toolbar-button-nummerierte-liste')
  I.see('Some text', 'ol')

  // Toggle ordered list off
  I.say('Toggle ordered list off')
  I.clickByQaClassName('plugin-toolbar-button-nummerierte-liste')
  I.dontSeeElement({ css: '.serlo-editor-hacks ol' })

  // Toggle H1 on
  I.say('Toggle H1 on')
  I.clickByQaClassName('plugin-toolbar-button-überschriften')
  I.clickByQaClassName('plugin-toolbar-heading-1')
  I.see('Some text', 'h1')

  // Toggle H1 off
  I.say('Toggle H1 off')
  I.clickByQaClassName('plugin-toolbar-button-überschriften')
  I.clickByQaClassName('plugin-toolbar-heading-1')
  I.dontSee('Some text', 'h1')

  // Toggle H2 on
  I.say('Toggle H2 on')
  I.clickByQaClassName('plugin-toolbar-button-überschriften')
  I.clickByQaClassName('plugin-toolbar-heading-2')
  I.see('Some text', 'h2')

  // Toggle H2 off
  I.say('Toggle H2 off')
  I.clickByQaClassName('plugin-toolbar-button-überschriften')
  I.clickByQaClassName('plugin-toolbar-heading-2')
  I.dontSee('Some text', 'h2')

  // Toggle H3 on
  I.say('Toggle H3 on')
  I.clickByQaClassName('plugin-toolbar-button-überschriften')
  I.clickByQaClassName('plugin-toolbar-heading-3')
  I.see('Some text', 'h3')

  // Toggle H3 off
  I.say('Toggle H3 off')
  I.clickByQaClassName('plugin-toolbar-button-überschriften')
  I.clickByQaClassName('plugin-toolbar-heading-3')
  I.dontSee('Some text', 'h3')

  // Color change orange
  I.say('Change text color to orange', 'orange')
  I.clickByQaClassName('plugin-toolbar-button-textfarben')
  I.clickByQaClassName('plugin-toolbar-button-orange')
  I.seeElement('span[style="color: rgb(255, 102, 0);"]')

  // Color reset
  I.say('Reset color')
  I.pressKey(['CommandOrControl', 'A'])
  I.clickByQaClassName('plugin-toolbar-button-textfarben')
  I.clickByQaClassName('plugin-toolbar-button-farbe-zurücksetzen')
  I.dontSeeElement('span[style="color: rgb(255, 102, 0);"]')

  // Toggle Math on
  I.say('Toggle math on')
  I.pressKey(['CommandOrControl', 'A'])
  I.pressKey('Backspace')
  I.clickByQaClassName('plugin-toolbar-button-matheformel')
  I.see('LaTeX')

  I.type('\\frac12')
  I.pressKey('ArrowRight')
  I.dontSee('LaTeX')
  I.seeElement('span.katex')

  // Toggle Math off
  I.say('Toggle math off')
  I.pressKey('ArrowLeft')
  I.clickByQaClassName('plugin-toolbar-button-matheformel')
  I.dontSeeElement('span.katex')
})

Scenario('Save changes', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('h1')

  I.type('Test save changes')

  I.clickByQaClassName('add-new-plugin-row-button')

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
