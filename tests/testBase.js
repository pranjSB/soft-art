// This file centralizes:
// 1. JS runtime error logging
// 2. Browser console error logging

import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => 
  {
      page.on('pageerror', error => // Logs uncaught JS errors from the page
      {
        console.error('PAGE JS ERROR');
        console.error(error.message);
        console.error(error.stack);
      });

    page.on('console', msg => // Logs browser console errors
    {
      if (msg.type() === 'error') 
      {
        console.error('BROWSER CONSOLE ERROR:', msg.text());
      }
    });

    await use(page);
  }
});

export { expect };
