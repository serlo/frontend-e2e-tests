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

Scenario('Quickbar', ({ I }) => {
  I.amOnPage('/')

  // Aktivate quickbar
  I.click('input[placeholder*="heute lerne ich"]')
  I.type('Vektor')

  // Check dropdown
  I.see('Kreuzprodukt')
  I.see('Vektorbegriff')
  I.see('Auf Serlo nach')

  // Nav by enter
  I.pressKey('Enter')
  I.seeInTitle('Vektor')

  // Another search
  I.amOnPage('/')
  I.click('input[placeholder*="heute lerne ich"]')
  I.type('Berechnungen am Kreis')

  I.click('Berechnungen am Kreis')
  I.seeInTitle('Berechnungen am Kreis')
  I.see('Dreiecke, Vierecke')
})

Scenario('Share modal', ({ I }) => {
  I.amOnPage('/1553')
  I.click('Teilen')
  I.see('Link kopieren')
  I.see('Als PDF herunterladen')

  // QR code
  I.seeElement('svg[width="128"][height="128"]')
})

Scenario('Languages', ({ I }) => {
  I.amOnPage('/')
  I.click('Serlo in anderen Sprachen')
  I.see('Serlo.org in other languages')

  I.click('English')
  I.see('personalized learning')
  I.click('Serlo in other languages')

  I.click('Français')
  I.see('Notre vision est de permettre un apprentissage')
  I.click("Serlo dans d'autres langues")

  I.click('Español')
  I.see('Somos una organización de base')
  I.click('Serlo en otros idiomas')

  I.click('हिंदी')
  I.see('हम नॉनप्रॉफिट आर्गेनाइजेशन संगठन')
  // Somehow this is the only way to go back
  I.usePlaywrightTo('go back', async ({ page }) => {
    await page.goBack()
  })

  I.click('தமிழ் (Tamil)')
  I.see('நாம் சமமான கல்வி வாய்ப்புகளை')
})
