import { test, expect } from './testBase';

test.describe("Home page", () => 
{
  test('Verify that the page title is correct', async ({ page }) => 
  {
    console.log('Base URL is:', process.env.BASE_URL);

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const pageTitle = await page.title();
    console.log('The current page title is:', pageTitle);

    await expect(page).toHaveTitle(/The World’s Leading AI-Led Quality Engineering Company - Qualitest/);
  });
});