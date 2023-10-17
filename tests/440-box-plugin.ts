import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Box plugin')

Before(popupWarningFix)

async function addBoxPlugin(I: CodeceptJS.I, type: string) {
  I.say('Create box plugin and set type')
  I.click('$plugin-text-editor', '$plugin-article-content')
  I.type('/')
  I.type('Box')
  I.pressKey('Enter')
  I.seeElement('$plugin-box-initial-type-chooser')
  I.click(`$plugin-box-initial-type-chooser-option-${type}`)
}

Scenario('Create box plugin and set initial type', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  addBoxPlugin(I, 'attention')

  I.seeElement('$plugin-box') // Box plugin still there
  I.dontSeeElement('$plugin-box-initial-type-chooser') // Box initial type chooser gone
  I.see('Vorsicht') // Box type is Vorsicht
  // TODO: Check if focused & toolbar visible
})

Scenario('Change box type in toolbar', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  addBoxPlugin(I, 'blank')

  I.say('Change box type')
  I.selectOption('$plugin-box-type-chooser', 'quote')

  I.seeElement('$plugin-box')
  I.see('Zitat')
})

Scenario('Type inside box title', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  addBoxPlugin(I, 'blank')

  I.say('Type inside box title.')
  I.click('$plugin-text-editor', '$plugin-box-title')
  I.type('Boxtitel')

  I.see('Boxtitel', '$plugin-box-title')
})

Scenario('Type inside box content', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  addBoxPlugin(I, 'blank')

  I.say('Type inside box content')
  I.click('$plugin-text-editor', '$plugin-box-content')
  I.type('Boxinhalt')

  I.see('Boxinhalt', '$plugin-box-content')
})

Scenario(
  'Arrow keys can be used to switch between title and content',
  async ({ I }) => {
    I.amOnPage('/entity/create/Article/1377')
    addBoxPlugin(I, 'blank')

    I.say('Switch between title and content')
    I.click('$plugin-text-editor', '$plugin-box-title')
    I.pressKey('ArrowDown')
    I.type('Boxinhalt')
    I.pressKey('ArrowUp') // Set cursor to start of content text
    I.pressKey('ArrowUp') // Move cursor to box title
    I.type('Boxtitel')

    I.see('Boxtitel', '$plugin-box-title')
    I.see('Boxinhalt', '$plugin-box-content')
  },
)

Scenario.only('Empty box warning message appears when box content is empty', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  addBoxPlugin(I, 'blank')

  I.say('Empty warning message visible after creating new box')
  I.click('input[placeholder="Titel"]') // unfocus box plugin
  I.seeElement('$plugin-box-empty-content-warning')

  I.say('Empty warning message visible even if title is not empty')
  I.click('$plugin-text-editor', '$plugin-box-title')
  I.type('Boxtitel')
  I.click('input[placeholder="Titel"]') // unfocus box plugin
  I.seeElement('$plugin-box-empty-content-warning')

  I.say('Empty warning message not visible if content not empty')
  I.click('$plugin-text-editor', '$plugin-box-content')
  I.type('Boxinhalt')
  I.click('input[placeholder="Titel"]') // unfocus box plugin
  I.dontSeeElement('$plugin-box-empty-content-warning')
})
