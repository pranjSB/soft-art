/* import { test as base, expect } from '@playwright/test';
import CareersPage from '../../page_objects/careersPage';
import CreateAccountPage from '../../page_objects/createAccountPage';
import SignInPage from '../../page_objects/signInPage';
import CandidatePage from '../../page_objects/candidatePage';

export const test = base.extend
({

  userData: async ({}, use) => 
  {
    const user = 
    {
      email: process.env.SIGNIN_EMAIL,
      password: process.env.SIGNIN_PASSWORD,
      firstName: process.env.FIRST_NAME,
      lastName: process.env.LAST_NAME,
      phone: process.env.PHONE
    };

    await use(user);
  },

  page: async ({ page }, use) => 
  {
    page.on('pageerror', error => console.error('PAGE JS ERROR:', error.message)); // Logs JS runtime errors on the page
    page.on('console', message => console.error('BROWSER CONSOLE:', message.text())); // Logs browser console errors

    await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
    await use(page);
  },

  careersPage: async ({ page }, use) => 
  {
    await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
    await use(new CareersPage(page));
  },

  createAccountPage: async ({ page }, use) => 
  {
    await page.goto(process.env.CREATE_ACCOUNT_URL, { waitUntil: 'domcontentloaded' });
    await use(new CreateAccountPage(page));
  },

  signInPage: async ({ page }, use) => 
  {
    await page.goto(process.env.SIGNIN_URL, { waitUntil: 'domcontentloaded' });
    await use(new SignInPage(page));
  },

  candidatePage: async ({ page }, use) => 
  {
    await page.goto(process.env.SIGNIN_URL, { waitUntil: 'domcontentloaded' });
    await use(new CandidatePage(page));
  }
});

export { expect };

 */

/* import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import CareersPage from "../../page_objects/careersPage";
import CreateAccountPage from '../../page_objects/createAccountPage';
import CandidatePage from '../../page_objects/candidatePage';
import SignInPage from '../../page_objects/signInPage';

console.log('TEST BASE LOADED');

// Create logs folder once
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// One log file per run
const runTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
const logFilePath = path.join(logsDir, `console-errors-${runTimestamp}.log`);

export const test = base.extend({

  userData: async ({}, use) => 
  {
    const user = 
    {
      email: process.env.SIGNIN_EMAIL,
      password: process.env.SIGNIN_PASSWORD,
      firstName: process.env.FIRST_NAME,
      lastName: process.env.LAST_NAME,
      phone: process.env.PHONE
    };

    await use(user);
  },

  page: async ({ page }, use, testInfo) => {

    const testName = testInfo.title.replace(/\s+/g, '_');
    const stream = fs.createWriteStream(logFilePath, { flags: 'a' });
    const errors = [];

    const log = (type, message) => {
      const line = `[${new Date().toISOString()}] [${testName}] ${type}: ${message}`;
      stream.write(line + '\n');
      errors.push(line);
    };

    page.on('pageerror', error => {
      log('PAGE_JS_ERROR', error.message);
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();

        if (
          text.includes('favicon') ||
          text.includes('third-party') ||
          text.includes('google-analytics')
        ) {
          log('NOISE_CONSOLE_ERROR', text);
        } else {
          log('SEVERE_CONSOLE_ERROR', text);
        }
      }
    });

    await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
    await use(page);

    if (errors.length > 0) {
      await testInfo.attach('console-errors', {
        body: errors.join('\n'),
        contentType: 'text/plain'
      });
    }

    stream.end();
  },

  careersPage: async ({ page }, use) => {
    await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
    await use(new CareersPage(page));
  },

  createAccountPage: async ({ page }, use) => {
    await page.goto(process.env.CREATE_ACCOUNT_URL, { waitUntil: 'domcontentloaded' });
    await use(new CreateAccountPage(page));
  },

  signInPage: async ({ page }, use) => {
    await page.goto(process.env.SIGNIN_URL, { waitUntil: 'domcontentloaded' });
    await use(new SignInPage(page));
  },

  candidatePage: async ({ page }, use) => 
  {
    await page.goto(process.env.SIGNIN_URL, { waitUntil: 'domcontentloaded' });
    await use(new CandidatePage(page));
  }

});

export { expect };
 */

import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import CareersPage from "../../page_objects/careersPage";
import CreateAccountPage from '../../page_objects/createAccountPage';
import CandidatePage from '../../page_objects/candidatePage';
import SignInPage from '../../page_objects/signInPage';

console.log('TEST BASE LOADED');

// Create logs folder once
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// One JSON file (overwritten every run)
const logFilePath = path.join(logsDir, 'console-errors.json');

// Clear file at start of run
fs.writeFileSync(logFilePath, '');

export const test = base.extend({

  userData: async ({}, use) => 
  {
    const user = 
    {
      email: process.env.SIGNIN_EMAIL,
      password: process.env.SIGNIN_PASSWORD,
      firstName: process.env.FIRST_NAME,
      lastName: process.env.LAST_NAME,
      phone: process.env.PHONE
    };

    await use(user);
  },

  page: async ({ page }, use, testInfo) => {

    const testName = testInfo.title.replace(/\s+/g, '_');
    const stream = fs.createWriteStream(logFilePath, { flags: 'a' });
    const errors = [];

    const log = (type, severity, message) => {
      const entry = {
        timestamp: new Date().toISOString(),
        test: testName,
        type,
        severity,
        message
      };

      const line = JSON.stringify(entry);
      stream.write(line + '\n');
      errors.push(line);
    };

    page.on('pageerror', error => {
      log('page_js_error', 'severe', error.message);
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();

        if (
          text.includes('favicon') ||
          text.includes('third-party') ||
          text.includes('google-analytics')
        ) {
          log('console_error', 'noise', text);
        } else {
          log('console_error', 'severe', text);
        }
      }
    });

    await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
    await use(page);

    if (errors.length > 0) {
      await testInfo.attach('console-errors-json', {
        body: errors.join('\n'),
        contentType: 'application/json'
      });
    }

    stream.end();
  },

  careersPage: async ({ page }, use) => {
    await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
    await use(new CareersPage(page));
  },

  createAccountPage: async ({ page }, use) => {
    await page.goto(process.env.CREATE_ACCOUNT_URL, { waitUntil: 'domcontentloaded' });
    await use(new CreateAccountPage(page));
  },

  signInPage: async ({ page }, use) => {
    await page.goto(process.env.SIGNIN_URL, { waitUntil: 'domcontentloaded' });
    await use(new SignInPage(page));
  },

  candidatePage: async ({ page }, use) => 
  {
    await page.goto(process.env.SIGNIN_URL, { waitUntil: 'domcontentloaded' });
    await use(new CandidatePage(page));
  }

});

export { expect };
