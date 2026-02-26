import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

import { config } from './wdio.conf'

config.baseUrl = process.env.PARTNER_PORTAL_URL || 'https://partnerportal-e7gjbxh8gaa3gvht.westeurope-01.azurewebsites.net'

config.specs = [path.join(__dirname, '../src/tests/web/**/*.test.ts')]

config.capabilities = [
  {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--window-size=1440,900',
        '--disable-notifications',
        '--no-sandbox',
        '--disable-dev-shm-usage',
      ],
    },
  },
]

// Use ChromeDriver service instead of Appium for browser testing
config.services = ['chromedriver']

config.waitforTimeout = parseInt(process.env.EXPLICIT_WAIT_MS || '15000', 10)

export { config }
