import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - plugin toolbar')

Before(popupWarningFix)

Scenario('Duplicate plugin', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  const initialTextPluginsCount = await I.grabNumberOfVisibleElements(
    '$plugin-text-editor',
  )

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginsCount + 1)

  I.moveCursorTo(
    locate('[data-radix-collection-item]').inside('.plugin-toolbar'),
  )
  I.click('$duplicate-plugin-button')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginsCount + 2)
})

Scenario('Delete plugin', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  const initialTextPluginsCount = await I.grabNumberOfVisibleElements(
    '$plugin-text-editor',
  )

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginsCount + 1)

  I.moveCursorTo(
    locate('[data-radix-collection-item]').inside('.plugin-toolbar'),
  )
  I.click('$remove-plugin-button')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginsCount)
})

// The anchor link copy tool is currently not rendered in Codecept.
// If this feature passes experimental stage, it's worth finding a way
// to render it in Codecept. Otherwise, this todo can be removed.
// (https://trello.com/c/W6ZXhNpv/95-anchor-sprungmarke)
Scenario.todo('Copy link to plugin')
