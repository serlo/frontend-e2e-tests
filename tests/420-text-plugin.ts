import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Text plugin basic interactions')

Before(popupWarningFix)

// First Text plugin is the multimedia explanation,
// second is multimedia image caption,
// third is default empty text plugin
const initialTextPluginCount = 3

Scenario('Add a new line using Enter', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.say('Press Enter to add a new line')
  I.pressKey('Enter')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)
})

Scenario('Add new line in plugin using Enter', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  const firstText = 'first'
  const secondText = 'second'

  I.say('Type some text and move the cursor in the middle of it')
  I.type(firstText + secondText)
  I.see(firstText + secondText)
  for (let i = 0; i < secondText.length; i++) {
    I.pressKey('ArrowLeft')
  }

  I.say('Add new line in plugin using Enter')
  I.pressKey('Enter')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)
  I.dontSee(firstText + secondText)
  I.see(firstText)
  I.see(secondText)
})

Scenario('Remove empty Text plugin using Backspace key', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.say('Focus the default Text plugin')
  I.pressKey('ArrowDown')

  I.say('Nothing happens when Backspace is pressed in the first plugin')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.say('Add a second Text plugin')
  I.click('$add-new-plugin-row-button')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.say('Remove the forward slash')
  I.pressKey('Backspace')

  I.say('Remove the plugin using Backspace')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
})

Scenario('Remove empty Text plugin using Delete key', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.say('Focus the default Text plugin')
  I.pressKey('ArrowDown')

  I.say('Add a second Text plugin')
  I.click('$add-new-plugin-row-button')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.say('Remove the forward slash')
  I.pressKey('Backspace')

  I.say('Nothing happens when Delete is pressed in the last plugin')
  I.pressKey('Delete')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.say('Focus the first plugin')
  I.pressKey('ArrowUp')

  I.say('Remove the plugin using Delete')
  I.pressKey('Delete')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
})

Scenario.todo('Merge with previous plugin using Backspace key')

Scenario.todo('Merge with next plugin using Delete key')

Scenario('Undo', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')

  I.pressKey('Backspace')

  I.type('Some text')
  I.see('Some text')

  I.click('$editor-toolbar-undo')

  I.dontSee('Some text')
})

Scenario('Undo using keyboard', async ({ I }) => {
  const keyCombos = {
    windowsAndLinux: ['control', 'z'],
    mac: ['command', 'z'],
  }

  for (const [platform, keys] of Object.entries(keyCombos)) {
    I.say(`Checking undo keyboard shortcut for '${platform}'`)
    I.amOnPage('/entity/create/Article/1377')

    I.click('$add-new-plugin-row-button')

    I.pressKey('Backspace')

    I.type('Some text')
    I.see('Some text')

    I.pressKey(keys)

    I.dontSee('Some text')
  }
})

Scenario('Redo', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')

  I.pressKey('Backspace')

  I.type('Some text')

  I.see('Some text')

  I.click('$editor-toolbar-undo')

  I.dontSee('Some text')

  I.click('$editor-toolbar-redo')

  I.see('Some text')
})

Scenario('Redo using keyboard', async ({ I }) => {
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

    I.click('$add-new-plugin-row-button')

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
