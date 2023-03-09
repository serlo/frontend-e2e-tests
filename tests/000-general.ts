Feature('General')

Scenario('About Serlo', ({ I }) => {
  I.amOnPage('/')

  // Make sure it's the landing page
  I.see('einfache Erklärungen')
  I.see('Biologie')
  I.see('werbefrei')

  // Rounded corners are probably causing problems, move cursor a bit
  I.click('Mehr über uns', null, { position: { x: 10, y: 10 } })

  // Try to reduce flakyness
  I.waitForText('Über Serlo', 10, 'h1')

  // I am on the about page
  I.seeInTitle('Über Serlo')
  I.see('mehr als 10 Jahren')

  // Navigating around
  I.click('Pädagogisches Konzept')
  I.click('Anleitung für die Lernplattform serlo.org')
  I.scrollPageToBottom()
  I.click('Community')

  pause()

  // Make sure it's the right page, wait longer to reduce flakiness
  I.waitForText("Was gibt's zu tun?", 20)
})

Scenario('Main Menu', async ({ I }) => {
  async function ensureMenuState(
    button: string,
    item: string,
    open: boolean,
    context = 'ul.bg-white'
  ) {
    let maxLoop = 20
    while (
      (await tryTo(() => {
        I.see(item, context)
      })) != open
    ) {
      await I.click(button, 'ul')
      await I.wait(0.2)
      maxLoop--
      if (maxLoop <= 0) throw 'endless loop'
    }
  }

  async function testMenu() {
    await ensureMenuState('Fächer', 'Angewandte Nachhaltigkeit', true)
    I.see('Mathematik', 'ul.bg-white')
    await ensureMenuState('Fächer', 'Angewandte Nachhaltigkeit', false)

    await ensureMenuState('Über Uns', 'Transparenz', true)
    I.see('Wirkung', 'ul.bg-white')
    I.see('Transparenz', 'ul.bg-white')
    await ensureMenuState('Über Uns', 'Transparenz', false)

    // The li is clickable, therefore the context is ul
    await ensureMenuState('Mitmachen', 'Neu hier?', true, 'div.bg-white')
    I.see('Neu hier?')
    I.see('Teste den Editor', 'li')
    I.see('Hilfe', 'li')
  }

  // Test menu on landing and in content
  I.amOnPage('/')
  await testMenu()

  I.amOnPage('/mathe')
  await testMenu()
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

// Language versions are testing production
// This is not intended
/*
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
*/

Scenario('Donation', ({ I }) => {
  I.amOnPage('/')
  I.click('Jetzt Spenden')
  I.see('Deine Spende macht einen Unterschied')
  I.see('Mit PayPal spenden')

  I.click('Spendenformular laden')
  I.switchTo('iframe')
  I.waitForText('Bitte gib einen Spendenbetrag ein', 30)
  I.click('Jetzt spenden')
  I.see('Wähle eine Zahlungsart')
  I.switchTo() // back from iframe

  I.amOnPage('/')
  I.click('Einwilligungen widerrufen')
  I.see('Einwilligungen für externe Inhalte', 'h1')
})

Scenario('Legal Pages', ({ I }) => {
  I.amOnPage('/')
  I.click('Impressum')
  I.see('Amtsgericht München')
  I.see('Haftung für Inhalte')

  I.amOnPage('/')
  I.click('Datenschutz')
  I.see('personenbezogene Daten')
  I.see('Verarbeitung der Nutzerdaten')

  I.amOnPage('/')
  I.click('Nutzungsbedingungen und Urheberrecht')
  I.see('Änderungsvorbehalt')
  I.see('CC-BY-SA-Lizenz')
})

Scenario('Consent', async ({ I }) => {
  I.amOnPage('/')
  I.click('Jetzt Spenden')

  // Make sure that twingle is activated
  const needConfirmation = await tryTo(() => {
    I.see('Spendenformular laden')
  })
  if (needConfirmation) {
    I.click('Spendenformular laden')
  }

  I.amOnPage('/')
  I.click('Einwilligungen widerrufen')
  I.see('Twingle')
  I.click('Nicht mehr erlauben')
  I.see('Keine Einwilligungen gespeichert')

  // Go back and check
  I.amOnPage('/')
  I.click('Jetzt Spenden')
  I.see('Spendenformular laden')
})

Scenario('Special Pages', ({ I }) => {
  I.amOnPage('/')
  I.click('Kontakt')
  I.see('Kontakt und Standorte', 'h1')
  I.click('Jobs')
  I.see('Digitale Bildung braucht dich', 'h1')
  I.see('Unsere offenen Stellen')
  I.see('Weiterbildung')

  I.amOnPage('/')
  I.click('Kontakt')

  // Wait for next page to load before clicking team
  I.see('Kontakt und Standorte', 'h1')
  I.click('Team')

  // Needs to do external fetching, so wait a bit longer
  I.waitForText('Softwareentwicklung', 30)
})
