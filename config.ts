import dotenv from 'dotenv'

function createConfig() {
  dotenv.config()

  const usesLocalApi = process.env.FRONTEND_API == 'local'

  return {
    adminUser: usesLocalApi ? 'admin' : 'Kulla',
    emailClientUrl: 'http://localhost:4436',
    frontendUrl: process.env.FRONTEND_URL ?? 'https://de.serlo-staging.dev',
    isCI: Boolean(process.env.CI),
    shouldRunOnlyLocally: usesLocalApi,
  }
}

const config = createConfig()

export default config
