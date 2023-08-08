import { event } from 'codeceptjs'

const compiledRoutes = new Set<string>()

const stepBeforeHandler = async (step) => {
  if (step.name === 'amOnPage') {
    const route = step.args[0]
    if (!compiledRoutes.has(route)) {
      // Let's increase the timeout in a hacky way to make sure there is enough
      // time for our page to compile
      step.options.timeout = 15000
      await precompilePage(route)
      console.log('Compile ')
      compiledRoutes.add(route)
    }
  }
}

export function registerPreCompilePages() {
  console.log('Registering step before handler')
  /**
   * Allows urls to be compiled on the fly and therefore adds some resiliency to
   * run the tests against the dev server
   */
  event.dispatcher.on(event.step.before, stepBeforeHandler)
  // event.dispatcher.on(event.step.after, stepAfterHandler)
}

export function deregisterPreCompilePages() {
  console.log('Deregistering step before handler')
  event.dispatcher.removeListener(event.step.before, stepBeforeHandler)
}

async function precompilePage(route: string) {
  // This assumes the base URL is the one from which you're running tests
  const FRONTEND_URL = process.env.FRONTEND_URL
  const fullUrl = `${FRONTEND_URL}${route}`

  const response = await fetch(fullUrl)
  if (!response.ok) {
    throw new Error(
      `Failed to precompile ${fullUrl}. Status: ${response.status}`,
    )
  }
}
