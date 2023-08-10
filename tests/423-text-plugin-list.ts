import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Text plugin - list')

Before(popupWarningFix)

Scenario('Unordered list shortcuts (indentation missing)', async ({ I }) => {
  // TODO: Indent/un-indent list
  // At the moment, I am unable to indent a bullet list within the text. Therefore, I cannot test this case here.

  I.amOnPage('/entity/create/Article/1377')

  I.say('Add a new text plugin and delete the backslash')
  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')

  I.say('Create a list')
  I.type('- Some text')
  I.see('Some text', 'ul')

  I.say('Add new list item on enter')
  I.pressKey('Enter')
  I.type('Some more text')
  I.see('Some more text', 'ul')

  I.say('Exit the list on double enter')
  I.pressKey('Enter')
  I.pressKey('Enter')
  I.type('Exit the list')
  I.dontSee('Exit the list', 'ul')

  I.say('Clear Text in list')
  I.pressKey(['CommandOrControl', 'A'])
  I.pressKey('Backspace')
  I.seeElement({
    css: '.serlo-editor-hacks div[data-slate-editor="true"] ul:not(.unstyled-list)',
  })

  I.say('Remove empty list item on backspace')
  I.pressKey('Backspace')
  I.dontSeeElement({
    css: '.serlo-editor-hacks div[data-slate-editor="true"] ul:not(.unstyled-list)',
  })
})

Scenario.todo('Ordered list shortcuts')
