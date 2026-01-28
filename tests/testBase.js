import { test as base, expect } from '@playwright/test';
import CareersPage from '../page_objects/careersPage';
import CreateAccountPage from '../page_objects/createAccountPage';
import SignInPage from '../page_objects/signInPage';

export const test = base.extend
({

  page: async ({ page }, use) => 
  {
    page.on('pageerror', error => // Logs JS runtime errors on the page
    {
      console.error('PAGE JS ERROR:', error.message);
    });

    page.on('console', msg => // Logs browser console errors
    {
      console.error('BROWSER CONSOLE ERROR:', msg.text());
    });

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
  }

});

export { expect };
