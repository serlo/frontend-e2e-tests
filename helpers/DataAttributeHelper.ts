class CustomHelper extends Helper {
  clickByDataQA(value: string) {
    const { Playwright } = this.helpers
    const dataQaXpath = `//*[@data-qa='${value}']`
    return Playwright.click({ xpath: dataQaXpath })
  }
}

module.exports = CustomHelper
