import { execSync } from 'child_process'

function isDevServerRunning() {
  try {
    const processOutput = execSync('ps aux | grep "next dev"').toString()
    const isNextDevServerRunning = processOutput.includes('next dev')
    return isNextDevServerRunning
  } catch (error) {
    return false
  }
}

export async function precompilePages() {
  if (!isDevServerRunning()) {
    // Dev server is not running. We assume that yarn build and yarn start where
    // ran and there is no need to precompile pages!
    return
  }

  const FRONTEND_URL = process.env.FRONTEND_URL
  fetch(FRONTEND_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to reach FRONTEND_URL. Status: ${response.status}`,
        )
      }
    })
    .catch((error) => {
      throw new Error(
        `Could not reach client. Make sure the server is running! Error: ${error.message}`,
      )
    })

  const routes = [
    '/',
    '/entity/repository/add-revision/74888',
    '/mathe',
    '/spenden',
    '/community',
    '/consent',
    '/taxonomy/term/sort/entities',
  ]

  for (const route of routes) {
    const url = `${FRONTEND_URL}${route}`
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }

      console.log(`Precompiled ${route}`)
    } catch (error) {
      console.error(`Failed to precompile ${route}. Error: ${error.message}`)
    }
  }
}
