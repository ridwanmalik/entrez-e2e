import path from 'path';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

export const config: WebdriverIO.Config = {
  runner: 'local',

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: path.join(__dirname, '../tsconfig.json'),
      transpileOnly: true,
      require: ['tsconfig-paths/register'],
    } as any,
  },

  // Appium server coordinates (managed by @wdio/appium-service below)
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT || '4723', 10),
  path: '/',

  specs: [path.join(__dirname, '../src/tests/**/*.test.ts')],
  exclude: [],

  maxInstances: 1,

  // Capabilities are defined per-platform in platform-specific configs
  capabilities: [],

  logLevel: 'warn', // 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent'
  bail: 0,

  // Default explicit wait used in waitForElement / waitForDisplayed calls
  waitforTimeout: parseInt(process.env.EXPLICIT_WAIT_MS || '30000', 10),

  connectionRetryTimeout: 180000,
  connectionRetryCount: 3,

  // @wdio/appium-service starts/stops Appium automatically
  services: [
    [
      'appium',
      {
        command: path.resolve(__dirname, '../node_modules/.bin/appium'),
        args: {
          relaxedSecurity: true,
          log: './appium.log',
          // Keep Appium server logs separate from WDIO output
          logLevel: 'info:debug',
        },
      },
    ],
  ],

  framework: 'mocha',

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'reports/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: false,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 120000, // 2 min per test — Appium interactions are slow
    require: [require.resolve('tsconfig-paths/register')],
  },

  // ── Hooks ────────────────────────────────────────────────────────────────────

  afterTest: async (test, _context, { error }) => {
    if (error) {
      const safeName = test.title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
      const timestamp = moment().format('YYYYMMDD_HHmmss');
      const screenshotPath = `reports/screenshots/${safeName}_${timestamp}.png`;
      try {
        await driver.saveScreenshot(screenshotPath);
        console.info(`[WDIO] Failure screenshot saved → ${screenshotPath}`);
      } catch (screenshotErr: any) {
        console.warn('[WDIO] Could not capture failure screenshot:', screenshotErr.message);
      }
    }
  },
};
