import { addAndFocusNewMultimediaPlugin } from './430-multimedia-plugin'

Feature('Serlo Editor - Multimedia plugin - image multimedia type')

Before(({ login }) => {
  login('admin')
})

// Currently, we're not displaying any messages when users try to upload image
// while not logged in. This scenario should be added when that is implemented.
Scenario.todo('Multimedia plugin unauthorized image upload')

// To test this with the current approach, we would need to host a big image
// in this repo. Is it worth it?
Scenario.todo('Multimedia plugin too big image upload')

Scenario('Multimedia plugin successful image upload', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  addAndFocusNewMultimediaPlugin(I)

  I.say('Focus multimedia Image plugin')
  I.click(locate('$plugin-image-editor').inside('.plugin-rows'))
  I.seeElement('$plugin-image-placeholder')

  I.say('Upload an image')
  I.attachFile('$plugin-image-upload', 'assets/sample-image.png')
  I.waitForElement('img.serlo-img', 10)
  I.dontSeeElement(locate('$plugin-image-placeholder').inside('plugin-rows'))

  I.say('Edit image description')
  const description = 'Simple sample image'
  I.click('$plugin-image-settings')
  I.fillField('Beschreibung (wird nicht angezeigt)', description)
  I.click('$modal-close-button')
  I.seeElement(locate('img.serlo-img').withAttr({ alt: description }))

  I.say('Edit image link')
  const href = 'https://de.serlo.org/mathe/test'
  I.click('$plugin-image-settings')
  I.fillField('Link', href)
  I.fillField('Maximale Breite', 200)
  I.click('$modal-close-button')
  I.seeElement(locate('$plugin-image-link').withAttr({ href }))

  I.say('Edit image max width')
  const maxWidth = 200
  I.click('$plugin-image-settings')
  I.fillField('Maximale Breite', maxWidth)
  I.click('$modal-close-button')
  I.seeElement(
    locate('.mx-auto').withAttr({ style: `max-width: ${maxWidth}px;` }),
  )

  I.say(
    'Switch to video and back to image - uploaded image and settings should stay',
  )
  I.click(locate('$plugin-image-editor').inside('.plugin-rows'))
  I.click('$plugin-multimedia-parent-button')
  I.click('$plugin-multimedia-settings-button')
  I.selectOption('$plugin-multimedia-type-select', 'Video')
  I.click('$modal-close-button')
  I.seeElement(
    locate('$plugin-video-placeholder').inside('$plugin-multimedia-wrapper'),
  )
  I.click('$plugin-multimedia-settings-button')
  I.selectOption('$plugin-multimedia-type-select', 'Bild')
  I.click('$modal-close-button')
  I.seeElement(locate('img.serlo-img').withAttr({ alt: description }))
  I.seeElement(locate('$plugin-image-link').withAttr({ href }))
  I.seeElement(
    locate('.mx-auto').withAttr({ style: `max-width: ${maxWidth}px;` }),
  )
})

Scenario('Multimedia plugin invalid image URL', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  addAndFocusNewMultimediaPlugin(I)

  I.say('Type in the image src')
  I.click(locate('$plugin-image-src').inside('.plugin-rows'))
  I.type('https://de.serlo.org/_assets/img/serlo-logo')
  // Unfortunately, our handling of invalid URLs is the same as handling of valid URLs, at the moment.
  // I couldn't figure out how to test for default browser "broken image".
  I.seeElement(
    locate('img.serlo-img').withAttr({
      src: 'https://de.serlo.org/_assets/img/serlo-logo',
    }),
  )
  I.dontSeeElement(locate('$plugin-image-placeholder').inside('plugin-rows'))
})

Scenario('Multimedia plugin valid image URL', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  addAndFocusNewMultimediaPlugin(I)

  I.say('Type in the image src')
  const src = 'https://de.serlo.org/_assets/img/serlo-logo.svg'
  I.click(locate('$plugin-image-src').inside('.plugin-rows'))
  I.type(src)
  I.seeElement(locate('img.serlo-img').withAttr({ src }))
  I.dontSeeElement(locate('$plugin-image-placeholder').inside('plugin-rows'))

  I.say('Edit image description')
  const description = 'Simple sample image'
  I.click('$plugin-image-settings')
  I.fillField('Beschreibung (wird nicht angezeigt)', description)
  I.click('$modal-close-button')
  I.seeElement(locate('img.serlo-img').withAttr({ alt: description }))

  I.say('Edit image link')
  const link = 'https://de.serlo.org/mathe/test'
  I.click('$plugin-image-settings')
  I.fillField('Link', link)
  I.fillField('Maximale Breite', 200)
  I.click('$modal-close-button')
  I.seeElement(locate('$plugin-image-link').withAttr({ href: link }))

  I.say('Edit image max width')
  const maxWidth = 200
  I.click('$plugin-image-settings')
  I.fillField('Maximale Breite', maxWidth)
  I.click('$modal-close-button')
  I.seeElement(
    locate('.mx-auto').withAttr({ style: `max-width: ${maxWidth}px;` }),
  )

  I.say('Switch to video and back to image - image and settings should stay')
  I.click(locate('$plugin-image-editor').inside('.plugin-rows'))
  I.click('$plugin-multimedia-parent-button')
  I.click('$plugin-multimedia-settings-button')
  I.selectOption('$plugin-multimedia-type-select', 'Video')
  I.click('$modal-close-button')
  I.seeElement(
    locate('$plugin-video-placeholder').inside('$plugin-multimedia-wrapper'),
  )
  I.click('$plugin-multimedia-settings-button')
  I.selectOption('$plugin-multimedia-type-select', 'Bild')
  I.click('$modal-close-button')
  I.seeElement(locate('img.serlo-img').withAttr({ src }))
  I.seeElement(locate('img.serlo-img').withAttr({ alt: description }))
  I.seeElement(locate('$plugin-image-link').withAttr({ href: link }))
  I.seeElement(
    locate('.mx-auto').withAttr({ style: `max-width: ${maxWidth}px;` }),
  )
})

Scenario('Multimedia plugin fill in image caption', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  addAndFocusNewMultimediaPlugin(I)

  I.say('Type in the caption')
  const caption = 'Pleasant image caption'
  I.click(locate('$plugin-text-editor').inside('$plugin-image-editor'))
  I.type(caption)
  I.see(caption, locate('$plugin-text-editor').inside('$plugin-image-editor'))

  I.say('Switch to video and back to image - caption should stay')
  I.click(locate('$plugin-image-editor').inside('.plugin-rows'))
  I.click('$plugin-multimedia-parent-button')
  I.click('$plugin-multimedia-settings-button')
  I.selectOption('$plugin-multimedia-type-select', 'Video')
  I.click('$modal-close-button')
  I.seeElement(
    locate('$plugin-video-placeholder').inside('$plugin-multimedia-wrapper'),
  )
  I.click('$plugin-multimedia-settings-button')
  I.selectOption('$plugin-multimedia-type-select', 'Bild')
  I.click('$modal-close-button')
  I.see(caption, locate('$plugin-text-editor').inside('$plugin-image-editor'))
})
