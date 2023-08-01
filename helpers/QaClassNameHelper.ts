class QaClassNameHelper extends Helper {
  clickByQaClassName(value: string) {
    const { Playwright } = this.helpers

    const isValueStartingWithPrefix = value.startsWith('qa-')
    if (isValueStartingWithPrefix) {
      console.warn(
        `No need to use the 'qa-' prefix when clicking '${value}', it's added automatically.`,
      )
    }

    const qaClassXpath = isValueStartingWithPrefix
      ? `//*[contains(@class, '${value}')]`
      : `//*[contains(@class, 'qa-${value}')]`
    return Playwright.click({ xpath: qaClassXpath })
  }
}

module.exports = QaClassNameHelper
