Feature('General')

Scenario('About Serlo', ({ I }) => {
  I.amOnPage('/')

  // Make sure it's the landing page
  I.see('einfache Erklärungen')
  I.see('Biologie')
  I.see('werbefrei')

  // Rounded corners are probably causing problems, move cursor a bit
  I.click('Mehr über uns', null, { position: { x: 10, y: 10 } })

  // I am on the about page
  I.seeInTitle('Über Serlo')
  I.see('mehr als 10 Jahren')

  // Navigating around
  I.click('Pädagogisches Konzept')
  I.click('Anleitung für die Lernplattform serlo.org')
  I.scrollPageToBottom()
  I.click('Community')

  // Make sure it's the right page
  I.see("Was gibt's zu tun?")
})

Scenario('Main Menu', ({ I }) => {
  function testMenu() {
    I.click('Fächer')
    I.see('Mathematik', 'li')
    I.see('Angewandte Nachhaltigkeit', 'li')
    // Close menu, try to reduce flakiness
    I.click('Fächer')
    I.wait(1)

    I.click('Über Uns')
    I.see('Wirkung', 'li')
    I.see('Transparenz', 'li')
    // Close menu
    I.click('Über Uns')
    I.wait(1)

    // The li is clickable, therefore the context is ul
    I.click('Mitmachen', 'ul')
    I.see('Neu hier?')
    I.see('Teste den Editor', 'li')
    I.see('Hilfe', 'li')
  }

  // Test menu on landing and in content
  I.amOnPage('/')
  testMenu()

  I.amOnPage('/mathe')
  testMenu()
})

/*Scenario('Quickbar', ({I}) => {

})*/
