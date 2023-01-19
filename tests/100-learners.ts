Feature('Learners')

const subjectQuickbarSelector = 'input[placeholder*="heute lerne ich"]'

interface LandingPageData {
  iconSelector: string
  headingText: string
  taxRootName: string
  quickbarKeyword: string
  quickbarKeywordResult: string
  quickbarDistractor: string
  quickbarDistractorDontSee: string
  taxonomy1: string
  taxonomyEntry1: string
  taxonomy2: string
  taxonomyEntry2: string
}

async function testLandingPage(I: CodeceptJS.I, data: LandingPageData) {
  I.amOnPage('/')

  // Use icon
  I.click(data.iconSelector)

  I.see(data.headingText)

  // Visit taxonomy
  I.click('Alle Themen')
  I.click(data.taxRootName, 'nav > a')

  // Check correct filter
  I.click(subjectQuickbarSelector)
  I.type(data.quickbarKeyword)
  I.see(data.quickbarKeywordResult, 'div.shadow')
  I.clearField(subjectQuickbarSelector)
  I.click(subjectQuickbarSelector)
  I.type(data.quickbarDistractor)
  I.dontSee(data.quickbarDistractorDontSee, 'div.shadow')

  // Close quickbar
  I.refreshPage()

  // Taxonomy explorer
  I.dontSee(data.taxonomyEntry1, 'div.image-hack')
  I.click(data.taxonomy1)
  I.see(data.taxonomyEntry1, 'div.image-hack')
  I.dontSee(data.taxonomyEntry2, 'div.image-hack')
  I.click(data.taxonomy2)
  I.see(data.taxonomyEntry2, 'div.image-hack')

  // Mitmachen
  I.click('Mitmachen', '.partner')
  I.see('Werde Teil der Serlo Community')
}

Scenario('Mathe - landing page', ({ I }) => {
  testLandingPage(I, {
    iconSelector: 'svg.superspecial-math',
    headingText: 'Keine Angst vor Zahlen',
    taxRootName: 'Mathematik',
    quickbarKeyword: 'vektor',
    quickbarKeywordResult: 'Vektorbegriff',
    quickbarDistractor: 'zelle',
    quickbarDistractorDontSee: 'Brennstoffzelle',
    taxonomy1: 'Zahlen & Größen',
    taxonomyEntry1: 'Grundrechenarten',
    taxonomy2: 'Stochastik',
    taxonomyEntry2: 'Kombinatorik',
  })
})

Scenario('Nachhaltigkeit - landing page', ({ I }) => {
  testLandingPage(I, {
    iconSelector: 'svg.superspecial-sus',
    headingText: 'Unsere Welt gibt es nur einmal',
    taxRootName: 'Angewandte Nachhaltigkeit',
    quickbarKeyword: 'umwelt',
    quickbarKeywordResult: 'Umweltschutz',
    quickbarDistractor: 'zelle',
    quickbarDistractorDontSee: 'Brennstoffzelle',
    taxonomy1: 'Plastik',
    taxonomyEntry1: 'Leben ohne Plastik?',
    taxonomy2: 'Klima',
    taxonomyEntry2: 'Klimawandel',
  })
})

Scenario('Biologie - landing page', ({ I }) => {
  testLandingPage(I, {
    iconSelector: 'svg.superspecial-bio',
    headingText: 'Gib deinem Hirn einen Evolutionssprung',
    taxRootName: 'Biologie',
    quickbarKeyword: 'zelle',
    quickbarKeywordResult: 'Tierische Zelle',
    quickbarDistractor: 'zelle',
    quickbarDistractorDontSee: 'Brennstoffzelle',
    taxonomy1: 'Ökologie',
    taxonomyEntry1: 'Populationsdynamik',
    taxonomy2: 'Vielfalt der Lebewesen',
    taxonomyEntry2: 'Wirbellose Tiere',
  })
})

Scenario('Chemie - landing page', ({ I }) => {
  testLandingPage(I, {
    iconSelector: 'svg.superspecial-chem',
    headingText: 'In der Chemie ist nicht alles ätzend',
    taxRootName: 'Chemie',
    quickbarKeyword: 'chemie',
    quickbarKeywordResult: 'Chemie Startseite',
    quickbarDistractor: 'zelle',
    quickbarDistractorDontSee: 'Tierische Zelle',
    taxonomy1: 'Grundlagen',
    taxonomyEntry1: 'Was ist Chemie?',
    taxonomy2: 'Stoffmenge',
    taxonomyEntry2: 'Stoffmenge und Mol',
  })
})

Scenario('Informatik - landing page', ({ I }) => {
  testLandingPage(I, {
    iconSelector: 'svg.superspecial-informatics',
    headingText: 'Keine Angst vor Computern',
    taxRootName: 'Informatik',
    quickbarKeyword: 'bin',
    quickbarKeywordResult: 'Binärsystem',
    quickbarDistractor: 'zelle',
    quickbarDistractorDontSee: 'Tierische Zelle',
    taxonomy1: 'Daten & Informationen',
    taxonomyEntry1: 'Verarbeitung von Informationen',
    taxonomy2: 'Theoretische Informatik',
    taxonomyEntry2: 'Formale Sprachen',
  })
})

Scenario('Interact with single choice', ({ I }) => {
  // Feedback from content
  I.amOnPage('/3383')
  I.see('Klicke auf eine der Optionen')
  I.click('15')
  I.click("Stimmt's?")
  I.see('Diese Antwort passt leider nicht')
  I.click('120')
  I.dontSee('Diese Antwort passt leider nicht')
  I.click("Stimmt's?")
  I.see('Diese Antwort passt leider nicht')
  I.click('495')
  I.click("Stimmt's?")
  I.see('Super!')

  // Fallback feedback
  I.amOnPage('/145139')
  I.click('mit dem Graphen')
  I.click("Stimmt's?")
  I.see('Leider nicht richtig')
  I.click('gestreckt')
  I.click("Stimmt's?")
  I.see('Richtig')
  I.dontSee('Leider nicht')
  I.click('gestaucht')
  I.click("Stimmt's?")
  I.see('Leider nicht richtig')
})

Scenario('Interact with multiple choice', ({ I }) => {
  I.amOnPage('/131435')
  I.see('Welche beiden Aufgaben')
  I.click("Stimmt's")
  I.see('Leider nicht richtig')
  I.click('15% von 400€')
  I.click("Stimmt's")
  I.see('Fast! Dir fehlt noch mindestens eine richtige Antwort.')

  // Deselect
  I.click('15% von 400€')
  I.dontSee('Fast! Dir fehlt noch mindestens eine richtige Antwort.')

  I.click('30% von 200€')
  I.click('15% von 400€')
  I.click("Stimmt's")
  I.see('Richtig')
})

Scenario('Geogebra', ({ I }) => {
  I.amOnPage('/43563')
  I.click('Applet laden von GeoGebra')
  I.switchTo('iframe')
  I.waitForElement('canvas[data-test="euclidianView"]', 10)
})

Scenario('Video + Injection', ({ I }) => {
  I.amOnPage('/18524')
  I.see('dass externe Inhalte von')
  I.click('Video abspielen von YouTube')
  I.switchTo('iframe')
  I.see('Satz des Pythagoras für rechtwinklige Dreiecke')
})

Scenario('Toggle Solution', ({ I }) => {
  I.amOnPage('/37779')
  I.see('Die Klasse 8a')
  I.dontSee('Für diese Aufgabe benötigst Du')
  I.click('Lösung anzeigen')
  I.see('Für diese Aufgabe benötigst Du')
  I.click('Lösung ausblenden')
  I.dontSee('Für diese Aufgabe benötigst Du')
})
