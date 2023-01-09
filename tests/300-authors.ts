Feature('Authors')

Before(({ login }) => {
  login('admin') // login as admin for now
})

Scenario('Open Editor', ({ I }) => {
  // … editor tests
})
