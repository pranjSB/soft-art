import { test as base, expect } from '@playwright/test';
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
