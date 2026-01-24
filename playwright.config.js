// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const isCI = !!process.env.CI; // !! converts the value into a boolean.

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: isCI,

  retries: isCI ? 3 : 0, // extra retries for flaky-heavy suites

  workers: isCI ? undefined : undefined, // CI workers handled by matrix instead (see workflow)

  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  use: {
    baseURL: process.env.BASE_URL,

    waitUntil: 'domcontentloaded',

    viewport: { width: 1440, height: 900 },

    navigationTimeout: 45_000,
    actionTimeout: 15_000,

    screenshot: 'only-on-failure',
    video: isCI ? 'retain-on-failure' : 'on',
    trace: isCI ? 'on-first-retry' : 'on',

    ignoreHTTPSErrors: true
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
