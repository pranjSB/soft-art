import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import CareersPage from "../../page_objects/careersPage";
import CreateAccountPage from '../../page_objects/createAccountPage';
import CandidatePage from '../../page_objects/candidatePage';
import SignInPage from '../../page_objects/signInPage';

const logsDir = path.join(process.cwd(), 'logs'); // Creates 'logs' folder once
if (!fs.existsSync(logsDir)) 
  fs.mkdirSync(logsDir);
const logFilePath = path.join(logsDir, 'console-errors.json'); // Overwrites JSON file for every run
fs.writeFileSync(logFilePath, ''); // Clears file at start of run 

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

  page: async ({ page }, use, testInfo) => 
  {
    const testName = testInfo.title.replace(/\s+/g, '_');
    const stream = fs.createWriteStream(logFilePath, { flags: 'a' });
    const errors = [];

    const log = (type, severity, message) => 
    {
      const entry = 
      {
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

    page.on('pageerror', error => 
    {
      log('page_js_error', 'severe', error.message);
    });

    page.on('console', msg => 
    {
      if (msg.type() === 'error') 
      {
        const text = msg.text();
        if (text.includes('favicon') || text.includes('third-party') || text.includes('google-analytics')) 
          log('console_error', 'noise', text); 
        else 
          log('console_error', 'severe', text);
      }
    });

    await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
    await use(page);

    if (errors.length > 0)
      await testInfo.attach('console-errors-json', {body: errors.join('\n'), contentType: 'application/json'});
    stream.end();
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
