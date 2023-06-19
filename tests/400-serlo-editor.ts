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

  I.pressKey(['Ctrl', 'C'])

  I.pressKey('Backspace')

  I.dontSee('TESTTESTTEST')

  I.pressKey(['Ctrl', 'V'])

  I.see('TESTTESTTEST')

  for (let i = 0; i < 12; i++) {
    I.pressKey('Backspace')
  }

  I.type('CUTCUTCUT')

  I.see('CUTCUTCUT')

  for (let i = 0; i < 9; i++) {
    I.pressKey(['Shift', 'LeftArrow'])
  }

  I.pressKey(['Ctrl', 'X'])

  I.dontSee('CUTCUTCUT')

  I.pressKey(['Ctrl', 'V'])

  I.see('CUTCUTCUT')
})

Scenario('Keyboard Toggle on and off', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.type('Some text')

  I.see('Some text')

  I.pressKey(['Ctrl', 'A'])

  //Toggle Bold + Italic on

  I.pressKey(['Ctrl', 'I'])

  I.seeElement({ css: 'em' }) //em = italic

  I.pressKey(['Ctrl', 'B'])

  I.seeElement({ css: 'strong' })

  //Toggle Bold + Italic off

  I.pressKey(['Ctrl', 'I'])

  I.dontSeeElement({ css: 'em' })

  I.pressKey(['Ctrl', 'B'])

  I.dontSeeElement({ css: 'strong' })

  //Toggle Link on

  I.pressKey(['Ctrl', 'K'])

  I.type('https://de.serlo.org/mathe/1541/hypotenuse')

  I.click('div.mt-2.text-lg.text-gray-800')

  I.click('Some text')

  I.see('Hypotenuse')

  //Toggle Link off

  I.click('Füge ein Element hinzu')

  I.type('Some text')

  I.see('Some text')

  I.pressKey(['Ctrl', 'A'])

  I.pressKey(['Ctrl', 'K'])

  I.type('https://de.serlo.org/mathe/1541/hypotenuse')

  I.click('div.mt-2.text-lg.text-gray-800')

  I.pressKey(['Ctrl', 'A'])

  I.pressKey(['Ctrl', 'K'])

  I.dontSeeElement(
    'button.serlo-tooltip-trigger.bg-editor-primary-200:nth-child(3)'
  )

  //Toggle Math on

  I.pressKey(['Ctrl', 'A'])
  I.pressKey('Backspace')

  I.pressKey(['CommandOrControl', 'M'])

  I.see('LaTeX')
  I.type('\\frac12 test')
  I.pressKey('ArrowRight')
  I.dontSee('LaTeX')

  I.seeElement('span.katex')

  //Toggle Math off

  I.pressKey(['Shift', 'LeftArrow'])

  I.pressKey(['Ctrl', 'A'])

  I.pressKey(['Ctrl', 'M'])

  I.dontSee('test')

  //Toggle unordered list on

  I.type('- Some test')

  I.seeElement({ css: '.serlo-editor-hacks ul:not(.unstyled-list)' })

  //Toggle unordered list off

  for (let i = 0; i < 9; i++) {
    I.pressKey('LeftArrow')
  }

  I.pressKey('Backspace')

  I.dontSeeElement({ css: '.serlo-editor-hacks ul:not(.unstyled-list)' })

  //Clear
  I.pressKey(['Ctrl', 'A'])

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

Scenario('Toolbar Toggle on and off', async ({ I }) => {
  //Toggle unordered list on

  I.amOnPage('/entity/create/Article/1377')

  I.click('Füge ein Element hinzu')

  I.pressKey('Backspace')

  I.type('Some test')

  I.pressKey(['Ctrl', 'A'])

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(7)')

  I.seeElement({ css: '.serlo-editor-hacks ul:not(.unstyled-list)' })

  //Toggle unordered list off

  I.click('button.serlo-tooltip-trigger.cursor-pointer:nth-child(7)')

  I.dontSeeElement({ css: '.serlo-editor-hacks ul:not(.unstyled-list)' })
})
