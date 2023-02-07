import dotenv from 'dotenv'

function createConfig() {
    dotenv.config()

    const isCI = Boolean(process.env.CI)

    if (process.env.NODE_ENV === 'local') {
        return {
            adminUser: 'admin',
            isCI,
            frontendUrl: 'http://localhost:3000',
        }
    }

    return {
        adminUser: 'Kulla',
        isCI,
        frontendUrl: 'https://de.serlo-staging.dev',
    }
}

const config = createConfig()

export default config