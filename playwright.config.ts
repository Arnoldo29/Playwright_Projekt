import test, { defineConfig, devices, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';
import { config } from 'process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './Testdaten_generator',
  testMatch: '**/*.spec.ts',

  projects: [
    {
      name: 'DatenGenerieren',
      testMatch: ['tests/DatenGenerieren.spec.ts'],
    },
    {
      name: 'GenUndExport_API',
      testMatch: ['tests/GenUndExport_API.spec.ts'],
    },
    {
      name: 'APIDataCoffeeShop',
      testMatch: ['tests/APIDataCoffeeShop.spec.ts'],
    },
    {
      name: 'API_Testdaten',
      testMatch: ['tests/API_Testdaten.spec.ts'],
    },
    {
      name: 'API_UngültigeDaten',
      testMatch: ['tests/API_UngültigeDaten.spec.ts'],
    },
  ],

  timeout: 30000, // Timeout für jeden Test


  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  reporter: [ ['list'],
   ['junit', {outputFile: 'test-results/results.xml' }], 
   ['allure-playwright', {outputFolder: 'allure-results', suiteTitle: true}], ['line']],

 
  //outputDir: 'testdaten_generator/allure-results', // speichert Ergebnisse nur hier

  //globalSetup: require.resolve('./utils/global-setup.ts'),

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,

    storageState: 'loggedInsate.json',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: false },
    },

   // {
   //   name: 'firefox',
   //   use: { ...devices['Desktop Firefox'] },
   //
    //{
    //  name: 'webkit',
    //  use: { ...devices['Desktop Safari'] },
   // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },


 // const config: PlaywrightTestConfig = {
   // testDir: './tests',
    /* Maximum tine one test can run for. */
   // expect: {

   // }}
});
