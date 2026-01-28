import { test, expect } from "./testBase";

test.describe('Home page', () => {

  test('Verify that the page title is correct', async ({ page }) => {
    const pageTitle = await page.title();
    await expect(page).toHaveTitle(/Qualitest/i);
  });

});
