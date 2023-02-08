import dotenv from 'dotenv'

function createConfig() {
  dotenv.config()

  return {
    adminUser: process.env.FRONTEND_API == 'local' ? 'admin' : 'Kulla',
    isCI: Boolean(process.env.CI),
    frontendUrl: process.env.FRONTEND_URL ?? 'https://de.serlo-staging.dev',
  }
}

const config = createConfig()

export default config
